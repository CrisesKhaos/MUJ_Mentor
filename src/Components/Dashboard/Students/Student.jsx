import React from "react";
import "./Student.css";
export default function Student({ name, regNo, email }) {
  return (
    <div className="student-wrapper">
      <div className="student-name">{name}</div>
      <div className="student-details">{email}</div>
      <div className="student-details">{regNo}</div>
    </div>
  );
}
