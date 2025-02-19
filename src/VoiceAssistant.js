import React, { useState, useEffect } from "react";
import axios from "axios";

const VoiceAssistant = () => {
  const [text, setText] = useState(""); // User's voice input
  const [speaker, setSpeaker] = useState(""); // Detected speaker
  const [response, setResponse] = useState(""); // AI's response
  const [videoUrl, setVideoUrl] = useState(""); // Video response

  useEffect(() => {
    startListening();
  }, []);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript.toLowerCase();
      setText(speechText);
      identifySpeaker(speechText);
    };

    recognition.start();
  };

  const identifySpeaker = (speechText) => {
    if (speechText.includes("arun")) {
      setSpeaker("Arun");
      fetchAnswer(speechText); // Get answer for the question
    } else {
      setSpeaker("Guest");
      fetchAnswer(speechText); // Fetch answer for guest too
    }
  };

  const fetchAnswer = async (query) => {
    try {
      const wikipediaUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;
      const response = await axios.get(wikipediaUrl);
  
      if (response.data.extract) {
        generateResponse(response.data.extract, "male"); // Speak response
        setResponse(response.data.extract);
        fetchYouTubeVideo(query); // Fetch Video
      } else {
        generateResponse("I couldn't find any information.", "male");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      generateResponse("Error fetching information.", "male");
    }
  };
  

  const fetchYouTubeVideo = async (query) => {
    try {
      const youtubeApiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your API Key
      const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${youtubeApiKey}`;
      const response = await axios.get(youtubeUrl);
      if (response.data.items.length > 0) {
        const videoId = response.data.items[0].id.videoId;
        setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
      }
    } catch (error) {
      console.error("Error fetching YouTube video:", error);
    }
  };

  const generateResponse = (reply, voiceType) => {
    setResponse(reply);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(reply);
    synth.speak(utterance);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>🎙 Voice Assistant</h1>
      <p><b>User:</b> {speaker}</p>
      <p><b>Detected Text:</b> {text}</p>
      <p><b>Response:</b> {response}</p>
      {videoUrl && (
        <iframe width="560" height="315" src={videoUrl} title="YouTube Video" allowFullScreen></iframe>
      )}
      <br />
      <button onClick={startListening}>🎤 Speak Again</button>
    </div>
  );
};

export default VoiceAssistant;
