import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VoiceRecognition = ({ setUser }) => {
  const navigate = useNavigate();
  const [speaker, setSpeaker] = useState("");

  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript.toLowerCase();
      if (speechText.includes("arun")) {
        setSpeaker("Arun");
        setUser("Arun");
      } else {
        setSpeaker("Guest");
        setUser("Guest");
      }
      navigate("/chat");
    };

    recognition.onerror = (event) => {
      alert("Error in speech recognition: " + event.error);
    };

    recognition.start();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎙 Identify Yourself</h1>
      <p><b>Detected Speaker:</b> {speaker}</p>
      <button onClick={startListening}>🎤 Speak Your Name</button>
    </div>
  );
};

export default VoiceRecognition;
