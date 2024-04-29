import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState();
  let navigate = useNavigate();

  async function signInHandler() {
    await supabase.auth
      .signInWithPassword({
        email: email,
        password: password,
      })
      .then((userDetails) => {
        if (userDetails.error == null) {
          navigate("/dashboard");
        } else alert(userDetails.error.message);
      });
  }

  useEffect(() => {
    supabase.auth.getUser()?.then((userDetails) => {
      if (userDetails.error == null) {
        navigate("/dashboard");
      }
    });
  }, []);

  async function logoutHandler() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div className="homepage-container">
      <div className="login-card">
        <div className="sub-title">Sign in</div>
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
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="button-signin" onClick={signInHandler}>
          Sign In
        </div>
        <div
          className="button-signup"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
