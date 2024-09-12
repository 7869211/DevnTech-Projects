import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "../styles/SignUpForm.css"; 

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    name: "",
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
      const response = await fetch("http://localhost:5000/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/signin");  
      } else {
        setFormState((prevState) => ({
          ...prevState,
          errorMessage: data.message || "Sign Up failed",
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
    <section className="signup-container">
      <div className="signup-info">
        <h4>Register Account</h4>
        <p><h1>Create an account and start penning down your ideas</h1></p>
      </div>
      
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h3 className="signup-heading">Sign Up</h3>
          {formState.errorMessage && <p className="error-message">{formState.errorMessage}</p>}
          <div className="input-container">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
          </div>
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpForm;
