import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignInForm.css"; 
import poster3 from "../styles/poster3.png";

const SignInForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    errorMessage: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); 
        localStorage.setItem("isAuthenticated", "true"); 

        alert("Congratulations, you have successfully signed in!");

        navigate('/publishedposts');
        window.location.reload();
      } else {
        setFormState((prevState) => ({
          ...prevState,
          errorMessage: data.message || "Sign In failed",
        }));
      }
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        errorMessage: "An error occurred. Please try again.",
      }));
    }
  };

  return (
    <section className="signin-container">
      <div className="signin-form">
        <form onSubmit={handleSubmit}>
          <h3 className="signin-heading">Sign In</h3>
          {formState.errorMessage && <p className="error-message">{formState.errorMessage}</p>}
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleInputChange}
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
