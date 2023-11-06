import React from "react";

const SuccessForm = () => {
  const successStyle = {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    marginTop: "5rem",
  };

  return (
    <div style={successStyle}>
      <h2>Form Submitted Successfully</h2>
      <p>Thank you for submitting the form.</p>
    </div>
  );
};

export default SuccessForm;
