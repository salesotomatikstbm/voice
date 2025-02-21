// import React, { useState } from "react";
// import * as tf from "@tensorflow/tfjs";

// const VoiceRecognition = () => {
//   const [recognizedUser, setRecognizedUser] = useState(null);

//   const analyzeVoice = async (inputVoice) => {
//     const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
//     let bestMatch = null;
//     let bestScore = -1; // Cosine similarity ranges from -1 to 1
  
//     for (const user of storedUsers) {
//       const storedSample = user.voiceSample;
  
//       // Convert text to numerical tensors
//       const inputTensor = tf.tensor1d(
//         inputVoice.split("").map((char) => char.charCodeAt(0))
//       );
//       const storedTensor = tf.tensor1d(
//         storedSample.split("").map((char) => char.charCodeAt(0))
//       );
  
//       // Ensure both tensors are the same length
//       const maxLength = Math.max(inputTensor.shape[0], storedTensor.shape[0]);
  
//       const paddedInput = inputTensor.pad([[0, maxLength - inputTensor.shape[0]]]);
//       const paddedStored = storedTensor.pad([[0, maxLength - storedTensor.shape[0]]]);
  
//       // Calculate cosine similarity
//       const dotProduct = tf.dot(paddedInput, paddedStored).dataSync()[0];
//       const normA = tf.norm(paddedInput).dataSync()[0];
//       const normB = tf.norm(paddedStored).dataSync()[0];
//       const similarity = dotProduct / (normA * normB);
  
//       if (similarity > bestScore) {
//         bestScore = similarity;
//         bestMatch = user;
//       }
  
//       inputTensor.dispose();
//       storedTensor.dispose();
//       paddedInput.dispose();
//       paddedStored.dispose();
//     }
  
//     return bestMatch;
//   };
  

//   const recognizeSpeaker = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.start();
//     recognition.onresult = async (event) => {
//       const transcript = event.results[0][0].transcript;
//       const matchedUser = await analyzeVoice(transcript);
//       if (matchedUser) {
//         setRecognizedUser(matchedUser);
//       } else {
//         setRecognizedUser({ name: "Unknown", designation: "Not Found" });
//       }
//     };
//   };

//   return (
//     <div>
//       <h2>Speak and Identify</h2>
//       <button onClick={recognizeSpeaker}>Start Listening</button>
//       {recognizedUser && (
//         <p>
//           <strong>Name:</strong> {recognizedUser.name} <br />
//           <strong>Designation:</strong> {recognizedUser.designation}
//         </p>
//       )}
//     </div>
//   );
// };

// export default VoiceRecognition;



// import React, { useState, useEffect } from "react";

// const VoiceTrainingPage = () => {
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [designation, setDesignation] = useState("");
//   const [voiceSamples, setVoiceSamples] = useState({});

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
//     setUsers(Array.isArray(storedUsers) ? storedUsers : []);
//   }, []);

//   const recordVoice = () => {
//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.start();
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setVoiceSamples({ ...voiceSamples, [name]: transcript });
//     };
//   };

//   const saveUser = () => {
//     if (!name || !designation || !voiceSamples[name]) {
//       alert("Please enter all details and record voice.");
//       return;
//     }
//     const newUser = { name, designation, voiceSample: voiceSamples[name] };
//     const storedUsers = JSON.parse(localStorage.getItem("userVoiceData")) || [];
//     const updatedUsers = Array.isArray(storedUsers) ? [...storedUsers, newUser] : [newUser];
//     localStorage.setItem("userVoiceData", JSON.stringify(updatedUsers));
//     setUsers(updatedUsers);
//     setName("");
//     setDesignation("");
//   };

//   return (
//     <div>
//       <h2>Train Your Voice</h2>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
//       <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Enter Designation" />
//       <button onClick={recordVoice}>Record Voice</button>
//       <button onClick={saveUser}>Save</button>
//       <ul>
//         {users.map((user, index) => (
//           <li key={index}>{user.name} - {user.designation}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default VoiceTrainingPage;
