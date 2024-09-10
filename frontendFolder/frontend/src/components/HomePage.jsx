import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/HomePage.css"; 
import poster3 from "../styles/poster3.png"; 

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="nav-container">
          <div className="auth-buttons">
          </div>
        </div>
      </header>

      <section className="main-section">
        <div className="text-container">
          <span className="welcome-text">Welcome to Blogging</span>
          <h1 className="headline">
            Pen down your ideas{" "}
            <span className="highlight">By creating a post</span>
          </h1>
          <p className="subtext">
            Your post must be free from racism and unhealthy words
          </p>
          <Link to="/publishedposts" className="explore-button">
            Let's Explore
          </Link>
        </div>
        <div className="image-container">
          <img src={poster3} alt="Blogging Illustration" className="poster-image" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
