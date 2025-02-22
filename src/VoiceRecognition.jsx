import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "bootstrap/dist/css/bootstrap.min.css";

const VoiceRecognition = () => {
  const [recognizedUser, setRecognizedUser] = useState(null);
  const [response, setResponse] = useState("");

  const analyzeVoice = async (inputVoice) => {
    const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
    let bestMatch = null;
    let bestScore = -1;

    for (const user of storedUsers) {
      const storedSample = user.voiceSample;
      const inputTensor = tf.tensor1d(
        inputVoice.split("").map((char) => char.charCodeAt(0))
      );
      const storedTensor = tf.tensor1d(
        storedSample.split("").map((char) => char.charCodeAt(0))
      );

      const maxLength = Math.max(inputTensor.shape[0], storedTensor.shape[0]);
      const paddedInput = inputTensor.pad([[0, maxLength - inputTensor.shape[0]]]);
      const paddedStored = storedTensor.pad([[0, maxLength - storedTensor.shape[0]]]);

      const dotProduct = tf.dot(paddedInput, paddedStored).dataSync()[0];
      const normA = tf.norm(paddedInput).dataSync()[0];
      const normB = tf.norm(paddedStored).dataSync()[0];
      const similarity = dotProduct / (normA * normB);

      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = user;
      }
    }

    return bestMatch;
  };

  const fetchWikipedia = async (query) => {
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        return "Error fetching Wikipedia data.";
      }
      
      const data = await response.json();
      return data.extract || "No relevant information found on Wikipedia.";
    } catch (error) {
      console.error("Network Error:", error);
      return "There was a network error fetching data from Wikipedia.";
    }
  };

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const recognizeSpeaker = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      const matchedUser = await analyzeVoice(transcript);

      if (matchedUser) {
        setRecognizedUser(matchedUser);
        setResponse(`Hello ${matchedUser.name}, you can now ask a question.`);
        speakResponse(`Hello ${matchedUser.name}, you can now ask a question.`);
        setTimeout(listenForQuestion, 3000);
      } else {
        setRecognizedUser({ name: "Unknown", designation: "Not Found" });
      }
    };
  };

  const listenForQuestion = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();

    recognition.onresult = async (event) => {
      const question = event.results[0][0].transcript;
      setResponse(`You asked: ${question}`);
      speakResponse(`You asked: ${question}`);
      const answer = await fetchWikipedia(question);
      setResponse(answer);
      speakResponse(answer);
      setTimeout(listenForQuestion, 5000);
    };
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 text-center">
        <h2 className="mb-4">Speak and Identify</h2>
        <button className="btn btn-primary mb-3" onClick={recognizeSpeaker}>Voice Recognition System
        </button>
        {recognizedUser && (
          <div className="alert alert-info">
            <strong>Name:</strong> {recognizedUser.name} <br />
            <strong>Designation:</strong> {recognizedUser.designation}
          </div>
        )}
        {response && <div className="alert alert-success"><strong>Response:</strong> {response}</div>}
      </div>
    </div>
  );
};

export default VoiceRecognition;