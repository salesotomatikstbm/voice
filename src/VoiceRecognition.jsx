import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

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
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return data.extract || "I couldn't find anything on Wikipedia.";
    } catch (error) {
      return "There was an error fetching data from Wikipedia.";
    }
  };

  const fetchChatGPT = async (query) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: query }],
        }),
      });
      const data = await response.json();
      return data.choices[0].message.content || "I couldn't get a response from ChatGPT.";
    } catch (error) {
      return "There was an error fetching data from ChatGPT.";
    }
  };

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const processQuestion = async (question) => {
    setResponse("Processing...");

    let answer;
    if (question.toLowerCase().startsWith("what is") || question.toLowerCase().startsWith("who is")) {
      answer = await fetchWikipedia(question);
    } else {
      answer = await fetchChatGPT(question);
    }
    
    setResponse(answer);
    speakResponse(answer);
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
      await processQuestion(question);
      setTimeout(listenForQuestion, 5000);
    };
  };

  return (
    <div>
      <h2>Speak and Identify</h2>
      <button onClick={recognizeSpeaker}>Start Listening</button>
      {recognizedUser && (
        <p>
          <strong>Name:</strong> {recognizedUser.name} <br />
          <strong>Designation:</strong> {recognizedUser.designation}
        </p>
      )}
      {response && <p><strong>Response:</strong> {response}</p>}
    </div>
  );
};

export default VoiceRecognition;
