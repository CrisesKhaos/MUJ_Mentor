import React, { useEffect, useState } from "react";
import "./StudDash.css";
import { supabase } from "../../client";
import Issue from "./Issue/Issue";
import { useNavigate } from "react-router-dom";

export default function StudDash({ id }) {
  const [activeTab, setActiveTab] = useState(0);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDisc, setIssueDisc] = useState("");
  const [issues, setIssues] = useState([]);
  const [useD, setuseD] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    supabase
      .from("userDetails")
      .select()
      .eq("userID", id)
      .then((data) => {
        setuseD(data.data[0].classHead);
        console.log(data.data[0].classHead);
      });
  }, []);

  async function issueSubmiter() {
    const { error } = await supabase.from("issues").insert({
      issuedToID: useD,
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
      .eq("issuerID", id)
      .eq("status", "active")
      .then((data) => {
        setIssues(data.data);
      });
    console.log(issues);
  }

  async function logoutHandler() {
    await supabase.auth.signOut().then(() => {
      navigate("/login");
    });
  }

  return (
    <div className="dashboard-container">
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
        </div>
        {activeTab == 0 ? (
          <div className="input-form">
            <input
              placeholder="Title"
              className="input-login"
              name="issueTitle"
              type="text"
              value={issueTitle}
              onChange={(e) => {
                setIssueTitle(e.target.value);
              }}
            />

            <input
              name="Details"
              placeholder="Details"
              className="input-login-big"
              type="text"
              value={issueDisc}
              onChange={(e) => {
                setIssueDisc(e.target.value);
              }}
            />
            <button className="button-signin" onClick={issueSubmiter}>
              Submit
            </button>
            <button onClick={issueGetter}>GET</button>
          </div>
        ) : null}

        {activeTab == 1
          ? issues.map((issue, key) => {
              return <Issue issue={issue} key={key} />;
            })
          : null}
      </div>
      <div className="idk">
        <div className="profile-section"> </div>
        <div className="options-section">
          <div className="logout-button" onClick={logoutHandler}>
            Logout
          </div>
          <div className="logout-button" onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
