import React, { useEffect } from "react";
import "./Homepage.css";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

// The One-Stop Shop for All Your College Concerns.
function Homepage() {
  let navigate = useNavigate();

  useEffect(() => {
    //checking if there is a user which matches the session
    supabase.auth.getUser()?.then((userDetails) => {
      /*if there is an error then navigate to login also logout so 
       the tampered session is completely deleted ! */
      if (userDetails.error) {
        console.log(userDetails.error);
      }
      // else? idk what to do rn
      else {
        navigate("/dashboard");
      }
    });
  }, []);

  return (
    <div className="homepage-container">
      <div className="title">MUJ HELPDESK</div>
      <div className="sub-title">Campus Concerns? We Speak Your Language.</div>

      <div className="buttons">
        <div
          className="button-signin"
          onClick={() => {
            navigate("/login");
          }}
        >
          Get Started
        </div>
      </div>
    </div>
  );
}

export default Homepage;
