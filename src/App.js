import React from "react";
import VoiceTrainingPage from "./VoiceTrainingPage";
import VoiceRecognition from "./VoiceRecognition";

const App = () => {
  return (
    <div>
      <h1>Hiruba Voice Training & Recognition</h1>
      <VoiceTrainingPage />
      <VoiceRecognition />
    </div>
  );
};

export default App;
