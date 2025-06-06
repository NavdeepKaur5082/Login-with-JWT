
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Login() 
{
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const handleSubmit = async (e) => 
    {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:4000/login",
          { ...values },
          { withCredentials: true }
        );
    
        if (data) {
          if (data.errors) 
          {
            // Check if any error exists and show toast only if not already shown
            const { email, password } = data.errors;
            if (email) generateError(email);
            else if (password) generateError(password);
          } 
          else 
          {
            // Success: Navigate and show success toast
            toast.success("Login successful!", { position: "bottom-right" });
            navigate("/");
          }
        }
      } 
      catch (err) 
      {
        console.log(err);
      }
    };
    
  return (
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;