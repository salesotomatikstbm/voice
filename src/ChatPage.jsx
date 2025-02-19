import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatPage = ({ user }) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    speak(`Hello ${user}, you can ask me anything.`);
  }, [user]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    setIsListening(true);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const speechText = event.results[0][0].transcript.toLowerCase();
      setQuestion(speechText);
      fetchAnswer(speechText);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      alert("Error in speech recognition: " + event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const fetchAnswer = async (query) => {
    try {
      // Encode query properly for Wikipedia API
      const encodedQuery = encodeURIComponent(query);
      const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodedQuery}`;
  
      const res = await axios.get(wikipediaUrl);
  
      if (res.data.type === "disambiguation") {
        setResponse("The topic has multiple meanings. Please be more specific.");
        speak("The topic has multiple meanings. Please be more specific.");
      } else if (res.data.extract) {
        setResponse(res.data.extract);
        speak(res.data.extract);
      } else {
        setResponse("I couldn't find any information.");
        speak("I couldn't find any information.");
      }
    } catch (error) {
      console.error("Error fetching information:", error);
      setResponse("Sorry, there was an error fetching information.");
      speak("Sorry, there was an error fetching information.");
    }
  };
  

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
             <h1>Hiruba</h1>
      <h1>🔊 Voice Assistant</h1>
      <p><b>User:</b> {user}</p>
      <p><b>Question:</b> {question}</p>
      <p><b>Response:</b> {response}</p>
      <button onClick={startListening} disabled={isListening}>🎤 Ask a Question</button>
    </div>
  );
};

export default ChatPage;
