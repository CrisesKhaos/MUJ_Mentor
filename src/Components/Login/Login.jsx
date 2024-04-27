import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState();
  let navigate = useNavigate();

  async function signUpHandler() {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    supabase.auth.getUser().then((userDetails) => {
      console.log(userDetails.data.user.email);
      navigate("/dashboard");
    });
  }, []);

  async function signInHandler() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log(error);
      console.log(data);
    } catch (error) {
      alert(error);
    }
  }

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
          console.log(e.target.value);
        }}
      />
      <button onClick={signInHandler}>Sign In</button>
      <button onClick={signUpHandler}>Sign Up</button>
      <button onClick={logoutHandler}>Sign Out</button>
    </div>
  );
}
