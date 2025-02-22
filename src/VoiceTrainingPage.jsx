import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-4">
        <h2 className="text-center fw-bold text-dark">Train Your Voice</h2>
        <p className="text-center text-muted">Store voice samples for easy recognition</p>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border-primary rounded-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border-primary rounded-3"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            placeholder="Enter Designation"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-warning fw-bold rounded-pill" onClick={recordVoice}>🎤 Record Voice</button>
          <button className="btn btn-success fw-bold rounded-pill" onClick={saveUser}>💾 Save</button>
        </div>
      </div>

      {users.length > 0 && (
        <div className="mt-4 card p-3 shadow rounded-4">
          <h4 className="fw-bold text-primary">Registered Users</h4>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceTrainingPage;
