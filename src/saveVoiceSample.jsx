const [userVoices, setUserVoices] = useState({});
const [currentSpeaker, setCurrentSpeaker] = useState("");

const saveVoiceSample = () => {
  if (recognizedWord) {
    const newUserVoices = { ...userVoices, [recognizedWord]: "User 1" };
    setUserVoices(newUserVoices);
    localStorage.setItem("userVoices", JSON.stringify(newUserVoices));
    alert("Voice sample saved!");
  }
};

const identifySpeaker = () => {
  const storedVoices = JSON.parse(localStorage.getItem("userVoices")) || {};
  if (recognizedWord in storedVoices) {
    setCurrentSpeaker(storedVoices[recognizedWord]);
  } else {
    setCurrentSpeaker("Unknown Speaker");
  }
};

return (
  <div>
    <button onClick={saveVoiceSample}>Save Voice Sample</button>
    <button onClick={identifySpeaker}>Identify Speaker</button>
    <p>Current Speaker: {currentSpeaker}</p>
  </div>
);
