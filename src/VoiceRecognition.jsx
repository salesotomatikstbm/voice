import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

const VoiceRecognition = () => {
  const [recognizedUser, setRecognizedUser] = useState(null);

  const analyzeVoice = async (inputVoice) => {
    const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
    let bestMatch = null;
    let bestScore = -1; // Cosine similarity ranges from -1 to 1
  
    for (const user of storedUsers) {
      const storedSample = user.voiceSample;
  
      // Convert text to numerical tensors
      const inputTensor = tf.tensor1d(
        inputVoice.split("").map((char) => char.charCodeAt(0))
      );
      const storedTensor = tf.tensor1d(
        storedSample.split("").map((char) => char.charCodeAt(0))
      );
  
      // Ensure both tensors are the same length
      const maxLength = Math.max(inputTensor.shape[0], storedTensor.shape[0]);
  
      const paddedInput = inputTensor.pad([[0, maxLength - inputTensor.shape[0]]]);
      const paddedStored = storedTensor.pad([[0, maxLength - storedTensor.shape[0]]]);
  
      // Calculate cosine similarity
      const dotProduct = tf.dot(paddedInput, paddedStored).dataSync()[0];
      const normA = tf.norm(paddedInput).dataSync()[0];
      const normB = tf.norm(paddedStored).dataSync()[0];
      const similarity = dotProduct / (normA * normB);
  
      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = user;
      }
  
      inputTensor.dispose();
      storedTensor.dispose();
      paddedInput.dispose();
      paddedStored.dispose();
    }
  
    return bestMatch;
  };
  

  const recognizeSpeaker = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      const matchedUser = await analyzeVoice(transcript);
      if (matchedUser) {
        setRecognizedUser(matchedUser);
      } else {
        setRecognizedUser({ name: "Unknown", designation: "Not Found" });
      }
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
    </div>
  );
};

export default VoiceRecognition;
