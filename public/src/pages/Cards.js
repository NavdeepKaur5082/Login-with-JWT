import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Cards() 
{
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [userId, setUserId] = useState(""); // Add state variable for user ID

  useEffect(() => 
  {
    const verifyUser = async () => 
    {
      if (!cookies.jwt) 
      {
        navigate("/login");
      } 
      else 
      {
        const { data } = await axios.post("http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) 
        {
          removeCookie("jwt");
          navigate("/login");
        } 
        else
        {
          setUserId(data.user); // Set the user ID
          toast(`Hi ${data.user} 🦄`, 
          {
            theme: "dark",
          });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => 
  {
    removeCookie("jwt");
    navigate("/register");
  };
  return (
    <>
      <div className="private">
        <h1>Welcome to Login App</h1>
        <h3>{userId}</h3> {/* Display the user ID */}
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
