import React, { useEffect } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    //checking if there is a user which matches the session
    supabase.auth.getUser().then((userDetails) => {
      console.log(userDetails);
      /*if there is an error then navigate to login also logout so 
       the tampered session is completely deleted ! */
      if (userDetails.error) {
        supabase.auth.signOut().then(() => {
          navigate("/login");
        });
      } else {
        console.log(userDetails.data.user.email);
      }
    });
  }, []);

  return <div>Dashy</div>;
}
