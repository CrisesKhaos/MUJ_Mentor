import React from "react";

export default function Issue({ issue }) {
  return (
    <div>
      <div className="issue-title">{issue.title}</div>
      <div className="issue-description">{issue.details}</div>
    </div>
  );
}
