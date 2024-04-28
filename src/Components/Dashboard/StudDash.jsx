import React, { useState } from "react";
import "./StudDash.css";
import { supabase } from "../../client";
import Issue from "./Issue/Issue";
export default function StudDash({ id }) {
  const [activeTab, setActiveTab] = useState(0);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDisc, setIssueDisc] = useState("");
  const [issues, setIssues] = useState([]);
  async function issueSubmiter() {
    const { error } = await supabase.from("issues").insert({
      issuerID: id,
      title: issueTitle,
      details: issueDisc,
      status: "active",
    });

    if (error) {
      console.log(error);
    }
    setIssueDisc("");
    setIssueTitle("");
  }

  async function issueGetter() {
    await supabase
      .from("issues")
      .select()
      .then((data) => {
        setIssues(data.data);
      });
    console.log(issues);
  }
  return (
    <div className="stud-container">
      <div className="idk"></div>
      <div className="issues">
        <div className="tabs">
          <div
            className={activeTab == 0 ? "tab-active" : "tab"}
            onClick={() => {
              if (activeTab != 0) setActiveTab(0);
            }}
          >
            Raise
          </div>
          <div
            className={activeTab == 1 ? "tab-active" : "tab"}
            onClick={() => {
              if (activeTab != 1) setActiveTab(1);
            }}
          >
            Active
          </div>
          <div
            className={activeTab == 2 ? "tab-active" : "tab"}
            onClick={() => {
              if (activeTab != 2) setActiveTab(2);
            }}
          >
            Resolved
          </div>

          <input
            name="issueTitle"
            type="text"
            value={issueTitle}
            onChange={(e) => {
              setIssueTitle(e.target.value);
            }}
          />

          <input
            name="issue"
            type="text"
            value={issueDisc}
            onChange={(e) => {
              setIssueDisc(e.target.value);
            }}
          />
          <button onClick={issueSubmiter}>Submit</button>
          <button onClick={issueGetter}>GET</button>
        </div>
      </div>
      {issues
        ? issues.map((issue, key) => {
            return <Issue issue={issue} key={key} />;
          })
        : null}
      <div className="idk"></div>
    </div>
  );
}
