import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VoiceRecognition from "./VoiceRecognition";
import ChatPage from "./ChatPage";

function App() {
  const [user, setUser] = React.useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoiceRecognition setUser={setUser} />} />
        <Route path="/chat" element={<ChatPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
