import React from "react";

const CollegeInfo = () => {
  return (
    <div className="container mt-5 d-flex flex-column align-items-center p-5 shadow-lg rounded" 
         style={{
           background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
           border: "2px solid #007bff",
           maxWidth: "600px",
           textAlign: "center"
         }}>
      
      {/* College Name */}
      <h2 className="fw-bold text-primary mb-2" style={{ letterSpacing: "1px" }}>
      St. Joseph’s Institute of Management (JIM)
      </h2>

      {/* Department */}
      <h4 className="text-secondary">Department of MBA</h4>

      {/* Divider */}
      <div className="border-top border-primary w-50 my-3" 
           style={{ borderWidth: "3px", transition: "all 0.3s ease-in-out" }}>
      </div>

      {/* Project Title */}
      <h5 className="text-dark fw-semibold">
        Project Title: <span className="text-danger">Voice Recognition System</span>
      </h5>

      {/* Submitted By */}
      <p className="mt-3 fs-5 fw-medium">
        <strong>Submitted by:</strong> <span className="text-success">Sherin</span>
      </p>

    </div>
  );
};

export default CollegeInfo;
