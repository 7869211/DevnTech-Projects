import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignInForm.css"; 
import poster3 from "../styles/poster3.png";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and authentication status in localStorage
        localStorage.setItem("token", data.token); 
        localStorage.setItem("isAuthenticated", "true"); 
        
        alert("Congratulations, you have successfully signed in!");

        // Navigate to "published posts"
        navigate('/publishedposts');

        // Force a page reload to update the authenticated user links
        window.location.reload(); 
      } else {
        setErrorMessage(data.message || "Sign In failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="signin-container">
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
          <h3 className="signin-heading">Sign In</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
      <div className="signin-image">
        <img src={poster3} alt="Poster" />
      </div>
    </section>
  );
};

export default SignInForm;
