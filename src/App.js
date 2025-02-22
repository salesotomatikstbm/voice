import React, { useState } from "react";
import VoiceTrainingPage from "./VoiceTrainingPage";
import VoiceRecognition from "./VoiceRecognition";
import CollegeInfo from "./CollegeInfo";
import Documentation from "./Documentation";
import Navbar from "./Navbar";
import Footer from "./Footer"; // Importing Footer component
import "bootstrap/dist/css/bootstrap.min.css";
import CollegeWebsiteEmbed from "./CollegeWebsiteEmbed";

const App = () => {
  const [activeTab, setActiveTab] = useState("collegeInfo");

  const renderContent = () => {
    switch (activeTab) {
      case "collegeInfo":
        return <CollegeInfo />;
      case "trainVoice":
        return <VoiceTrainingPage />;
      case "recognizeVoice":
        return <VoiceRecognition />;
      case "documentation":
        return <Documentation />;
      case "college":
        return <CollegeWebsiteEmbed />;
      default:
        return <CollegeInfo />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content with Margin Bottom */}
      <div className="container mt-5 pt-5 flex-grow-1">{renderContent()}</div>

      {/* Footer Sticks to Bottom */}
      <Footer />
    </div>
  );
};

export default App;
