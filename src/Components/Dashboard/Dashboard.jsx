import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import StudDash from "./StudDash.jsx";

export default function Dashboard() {
  let navigate = useNavigate();
  const [id, setId] = useState();
  useEffect(() => {
    //checking if there is a user which matches the session
    supabase.auth.getUser()?.then((userDetails) => {
      console.log(userDetails);
      /*if there is an error then navigate to login also logout so 
       the tampered session is completely deleted ! */
      if (userDetails.error) {
        supabase.auth.signOut().then(() => {
          navigate("/login");
        });
      }
      // else? idk what to do rn
      else {
        setId(userDetails.data.user.id);
      }
    });
  }, []);

  return (
    <div>
      <StudDash id={id} />
    </div>
  );
}
