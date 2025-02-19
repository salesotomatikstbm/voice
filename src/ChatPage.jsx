import React, { useState } from "react";

const ChatPage = () => {
  const [recognizedSpeaker, setRecognizedSpeaker] = useState(null);

  const analyzeVoice = (inputVoice) => {
    const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
    let bestMatch = null;
    let bestScore = 0;

    storedUsers.forEach(user => {
      let similarity = inputVoice.includes(user.voiceSample) ? 1 : 0; // Simple Matching
      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = user;
      }
    });

    return bestMatch;
  };

  const askQuestion = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
    recognition.onresult = (event) => {
      const question = event.results[0][0].transcript;
      const matchedUser = analyzeVoice(question);
      if (matchedUser) {
        setRecognizedSpeaker(matchedUser.name);
      }
    };
  };

  return (
    <div>
      <h2>Ask a Question</h2>
      <button onClick={askQuestion}>Start Listening</button>
      {recognizedSpeaker && <p>Question Asked by: {recognizedSpeaker}</p>}
    </div>
  );
};

export default ChatPage;
