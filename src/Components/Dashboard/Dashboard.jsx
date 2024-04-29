import React, { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import StudDash from "./StudDash.jsx";
import "./Dashboard.css";
import FacultyDash from "./FacultyDash.jsx";
export default function Dashboard() {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [isFaculty, setIsFaculty] = useState();
  useEffect(() => {
    //checking if there is a user which matches the session
    supabase.auth
      .getUser()
      ?.then(async (userDetails) => {
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
          console.log(id);
        }
      })
      .then(() => {
        supabase
          .from("userDetails")
          .select()
          .eq("userID", id)
          .then((data) => {
            setIsFaculty(data.data[0].isFaculty);
            console.log(isFaculty);
          });
      });
  }, [id, isFaculty]);

  return (
    <div>
      {isFaculty != null ? (
        <div>{isFaculty ? <FacultyDash id={id} /> : <StudDash id={id} />}</div>
      ) : null}
    </div>
  );
}
