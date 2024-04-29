import React, { useEffect, useState } from "react";
import "./StudDash.css";
import { supabase } from "../../client";
import Issue from "./Issue/Issue";
import { useNavigate } from "react-router-dom";
import Student from "./Students/Student";

export default function FacultyDash({ id }) {
  const [activeTab, setActiveTab] = useState(1);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDisc, setIssueDisc] = useState("");
  const [issues, setIssues] = useState([]);
  const [navigator, setNavigator] = useState(0);
  const [studentTab, setStudentTab] = useState(0);
  const [students, setStudents] = useState();
  const [newStudent, setNewStudent] = useState("");
  let navigate = useNavigate();

  async function addStudent() {
    await supabase
      .from("userDetails")
      .update({ classHead: id })
      .eq("email", newStudent);
    console.log(newStudent);
    console.log(id);
    setNewStudent("");
  }
  async function studentsGetter() {
    await supabase
      .from("userDetails")
      .select()
      .eq("classHead", id)
      .then((data) => {
        console.log(data.data);
        setStudents(data.data);
        console.log(students);
      });
  }

  useEffect(() => {
    issueGetter();
    studentsGetter();
  }, []);
  async function issueGetter() {
    await supabase
      .from("issues")
      .select()
      .eq("issuedToID", id)
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
      <div className="navigation">
        <div
          className={
            navigator == 0 ? "navigation-button-active" : "navigation-button"
          }
          onClick={() => {
            setNavigator(0);
          }}
        >
          Students
        </div>
        <div
          className={
            navigator == 1 ? "navigation-button-active" : "navigation-button"
          }
          onClick={() => {
            setNavigator(1);
          }}
        >
          Issues
        </div>
      </div>
      {navigator == 0 ? (
        <div className="issues">
          <div className="tabs">
            <div
              className={studentTab == 0 ? "tab-active" : "tab"}
              onClick={() => {
                if (studentTab != 0) setStudentTab(0);
              }}
            >
              Current
            </div>
            <div
              className={studentTab == 1 ? "tab-active" : "tab"}
              onClick={() => {
                if (studentTab != 1) setStudentTab(1);
              }}
            >
              Add
            </div>
          </div>
          {studentTab == 0 ? (
            <div className="students-list">
              {students?.map((student, key) => {
                return (
                  <Student
                    key={key}
                    email={student.email}
                    name={student.name}
                    regNo={student.regNo}
                  />
                );
              })}
            </div>
          ) : null}
          {studentTab == 1 ? (
            <div className="input-form">
              <input
                placeholder="Title"
                className="input-login"
                name="issueTitle"
                type="text"
                value={newStudent}
                onChange={(e) => {
                  setNewStudent(e.target.value);
                }}
              />

              <button className="button-signin" onClick={addStudent}>
                ADD STUDENT
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="issues">
          <div className="tabs">
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

          {activeTab == 1
            ? issues.map((issue, key) => {
                return (
                  <Student
                    name={issue.title}
                    email={issue.details}
                    regNo={issue.status}
                    key={key}
                  />
                );
              })
            : null}
        </div>
      )}
      <div className="idk">
        <div className="profile-section"></div>
        <div className="options-section">
          <div className="logout-button" onClick={logoutHandler}>
            Settings
          </div>
          <div className="logout-button" onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}
