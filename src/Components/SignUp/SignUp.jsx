import { supabase } from "../../client";

import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signUpHandler() {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    console.log(error);
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
      <button onClick={signUpHandler}>Sign Up</button>
    </div>
  );
}
