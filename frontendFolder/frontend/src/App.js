import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer"; 
import Navbar from "./components/Navbar";
import MyPosts from "./components/MyPosts";
import CreatePost from "./components/CreatePost";
import PublishedPosts from "./components/PublishedPosts";
import EditPost from "./components/EditPost";
import DraftPosts from "./components/DraftsPosts";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/myposts" element={<MyPosts/>} />
          <Route path="/createpost" element={<CreatePost/>} />
          <Route path="/publishedposts" element={<PublishedPosts/>} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/draftposts" element={<DraftPosts/>}/>
        </Routes>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
