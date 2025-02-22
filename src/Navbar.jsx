import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning shadow-sm fixed-top">
      <div className="container">
        {/* Brand Name */}
        <a className="navbar-brand fw-bold fs-4 text-dark" href="#">
        Voice Recognition System
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "collegeInfo" ? "fw-bold text-white bg-danger rounded" : "text-dark"}`}
                onClick={() => {
                  setActiveTab("collegeInfo");
                  setIsOpen(false);
                }}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "trainVoice" ? "fw-bold text-white bg-danger rounded" : "text-dark"}`}
                onClick={() => {
                  setActiveTab("trainVoice");
                  setIsOpen(false);
                }}
              >
                Train Your Voice
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "recognizeVoice" ? "fw-bold text-white bg-danger rounded" : "text-dark"}`}
                onClick={() => {
                  setActiveTab("recognizeVoice");
                  setIsOpen(false);
                }}
              >
                Speak & Identify
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "documentation" ? "fw-bold text-white bg-danger rounded" : "text-dark"}`}
                onClick={() => {
                  setActiveTab("documentation");
                  setIsOpen(false);
                }}
              >
                Documentation
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "college" ? "fw-bold text-white bg-danger rounded" : "text-dark"}`}
                onClick={() => {
                  setActiveTab("college");
                  setIsOpen(false);
                }}
              >
                College
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
