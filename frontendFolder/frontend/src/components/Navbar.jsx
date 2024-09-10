import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; 

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token"); 
      if (token) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false); 
      }
    };

    // Check authentication status on load
    checkAuth();

    // Optional: Use an event listener to detect changes to localStorage (e.g., token is added)
    window.addEventListener('storage', checkAuth);

    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  const handleSignOut = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false); 
    navigate("/"); 
  };

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <h1>Blogging</h1>
      </div>

      <div className="navbar-menu-icon" onClick={toggleMobileMenu}>
        <div className={`bar ${isMobileMenuOpen ? "change" : ""}`}></div>
        <div className={`bar ${isMobileMenuOpen ? "change" : ""}`}></div>
        <div className={`bar ${isMobileMenuOpen ? "change" : ""}`}></div>
      </div>

      <nav className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link" onClick={toggleMobileMenu}>
          Home
        </Link>

        {isAuthenticated && (
          <>
            <Link to="/myposts" className="navbar-link" onClick={toggleMobileMenu}>
              My Posts
            </Link>
            <Link to="/publishedposts" className="navbar-link" onClick={toggleMobileMenu}>
              Published
            </Link>
            <Link to="/draftposts" className="navbar-link" onClick={toggleMobileMenu}>
              Drafts
            </Link>
            <Link to="/createpost" className="navbar-link" onClick={toggleMobileMenu}>
              +New Post
            </Link>
            <Link
              to="/" 
              className="navbar-link" 
              onClick={() => { handleSignOut(); toggleMobileMenu(); }}
            >
              Sign Out
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/signup" className="navbar-link" onClick={toggleMobileMenu}>
              Sign Up
            </Link>
            <Link to="/signin" className="navbar-link" onClick={toggleMobileMenu}>
              Sign In
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
