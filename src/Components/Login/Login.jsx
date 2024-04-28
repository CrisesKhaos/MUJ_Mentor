import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
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
    <div>
      <input
        name="emailInput"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        name="passInput"
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signInHandler}>Sign In</button>
      <button onClick={logoutHandler}>Sign Out</button>
    </div>
  );
}
