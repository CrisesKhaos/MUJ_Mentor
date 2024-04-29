import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import "../Login/Login.css";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState();
  const [isFaculty, setisFaculty] = useState(true);
  let navigate = useNavigate();

  async function signUpHandler() {
    await supabase.auth
      .signUp({
        email: email,
        password: password,
      })
      .then((authDetails) => {
        if (authDetails.error == null) {
          supabase
            .from("userDetails")
            .insert({
              userID: authDetails.data.user.id,
              name: name,
              regNo: regNo,
              isFaculty: isFaculty,
              email: email,
            })
            .then((error) => {
              console.log(error);
              navigate("/dashboard");
            });
          console.log(authDetails);
          setAuthDetails(authDetails);
        } else alert(authDetails.error.message);
      })
      .then(async () => {});
  }

  return (
    <div className="homepage-container">
      <div className="signUp-card">
        <div className="sub-title">Sign Up</div>
        <div className="group">
          <input
            className="input-login"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="group">
          <input
            className="input-login"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="group">
          <input
            className="input-login"
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="group">
          <input
            className="input-login"
            placeholder={isFaculty ? "Employee No." : "Registraton No."}
            value={regNo}
            onChange={(e) => {
              setRegNo(e.target.value);
            }}
          />
        </div>
        <div className="faculty">
          Are you a faculty?
          <input
            className=""
            type="checkbox"
            placeholder="Email"
            checked={isFaculty}
            onChange={(e) => {
              setisFaculty(e.target.checked);
            }}
          />
        </div>
        <div className="button-signin" onClick={signUpHandler}>
          Sign Up
        </div>
        <div
          className="button-signup"
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign In
        </div>
      </div>
    </div>
  );
}
