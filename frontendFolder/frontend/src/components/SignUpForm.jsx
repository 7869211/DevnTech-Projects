import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "../styles/SignUpForm.css"; 


const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/signin");  
      } else {
        setErrorMessage(data.message || "Sign Up failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="signup-container">
      <div className="signup-info">
        <h4>Register Account</h4>
        <p><h1>Create an account and start penning down your ideas</h1></p>
      </div>

      {/* Sign Up Form */}
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h3 className="signup-heading">Sign Up</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
