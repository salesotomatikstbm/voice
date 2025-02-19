import React, { useState, useEffect } from "react";

const VoiceTrainingPage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [voiceSamples, setVoiceSamples] = useState({});

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
    setUsers(Array.isArray(storedUsers) ? storedUsers : []);
  }, []);

  const recordVoice = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceSamples({ ...voiceSamples, [name]: transcript });
    };
  };

  const saveUser = () => {
    if (!name || !designation || !voiceSamples[name]) {
      alert("Please enter all details and record voice.");
      return;
    }
    const newUser = { name, designation, voiceSample: voiceSamples[name] };
    const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
    const updatedUsers = Array.isArray(storedUsers) ? [...storedUsers, newUser] : [newUser];
    localStorage.setItem("userVoiceData", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setName("");
    setDesignation("");
  };

  return (
    <div>
      <h2>Train Your Voice</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
      <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Enter Designation" />
      <button onClick={recordVoice}>Record Voice</button>
      <button onClick={saveUser}>Save</button>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.designation}</li>
        ))}
      </ul>
    </div>
  );
};

export default VoiceTrainingPage;
