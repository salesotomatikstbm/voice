import React from "react";

const Documentation = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold">VOICE-BASED CHATBOT WITH ROLE-SPECIFIC RESPONSES</h2>
      <p className="text-muted text-center">Prepared by: [Your Name] | Date: [Insert Date]</p>

      <div className="card shadow p-4 mt-3">
        <h4 className="fw-bold">Introduction</h4>
        <p>
          In today’s technology-driven world, voice recognition and chatbots have become integral parts of modern communication systems. This project aims to develop a voice-based chatbot system that identifies users through voice recognition and customizes responses based on their designation.
        </p>

        <h4 className="fw-bold mt-3">Problem Statement</h4>
        <p>
          Traditional chatbots provide generic responses, failing to consider user roles. This project integrates voice recognition to authenticate users and deliver tailored responses, improving user experience and efficiency.
        </p>

        <h4 className="fw-bold mt-3">Objectives</h4>
        <h5>Primary Objectives:</h5>
        <ul>
          <li>Develop a voice recognition system for user identification.</li>
          <li>Implement a chatbot that customizes responses based on user designation.</li>
          <li>Ensure real-time, accurate responses.</li>
        </ul>
        <h5>Secondary Objectives:</h5>
        <ul>
          <li>Secure storage of user profiles and voice data.</li>
          <li>Improve chatbot accuracy using machine learning.</li>
          <li>Ensure scalability for multiple designations.</li>
        </ul>

        <h4 className="fw-bold mt-3">Background Study</h4>
        <ul>
          <li>Voice recognition enhances chatbot accuracy.</li>
          <li>Role-specific responses improve efficiency.</li>
          <li>Voice-based authentication is more convenient than manual methods.</li>
        </ul>

        <h4 className="fw-bold mt-3">Literature Review</h4>
        <ul>
          <li>Smith & Johnson (2024) highlighted neural networks for voice authentication.</li>
          <li>Chen et al. (2023) reviewed role-based chatbot response techniques.</li>
          <li>Lee & Patel (2022) demonstrated AI-driven chatbots in professional settings.</li>
        </ul>

        <h4 className="fw-bold mt-3">Research Design</h4>
        <p>
          The system integrates machine learning for voice recognition and NLP for chatbot interactions, with modules for user registration, voice processing, and chatbot response generation.
        </p>

        <h4 className="fw-bold mt-3">Data Collection Methods</h4>
        <ul>
          <li>User registration data (name, designation, voice samples).</li>
          <li>Chatbot interaction logs.</li>
          <li>Feedback on chatbot accuracy.</li>
        </ul>

        <h4 className="fw-bold mt-3">Data Analysis Techniques</h4>
        <ul>
          <li>Voice pattern recognition analysis.</li>
          <li>Sentiment analysis for user satisfaction.</li>
          <li>Statistical analysis of role-specific responses.</li>
        </ul>
      </div>
    </div>
  );
};

export default Documentation;