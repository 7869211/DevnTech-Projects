import React, { useState } from "react";
import axios from "axios";
import "../styles/CreatePost.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDraft, setIsDraft] = useState(false); 

  const handleSubmit = async (e, draft = false) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setIsDraft(draft); 
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("You must be logged in to create a post.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title: postData.title,
          content: postData.description,
          status: draft ? "draft" : "published", 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(`${draft ? "Draft" : "Post"} created successfully:`, response.data);
      setSuccess(true);
      setPostData({ title: "", description: "" }); 
  
      navigate(draft ? '/draftposts' : '/myposts');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Failed to create post. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <h2>Create a New Post</h2>

        {success && <p className="success-msg">{isDraft ? "Draft" : "Post"} created successfully!</p>}

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={(e) => handleSubmit(e, false)} className="form">
          <div className="form-group title-group">
            <input
              type="text"
              className="text-editor-input"
              placeholder="Enter post title..."
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group description-group">
            <textarea
              className="text-editor-area"
              placeholder="Pen down your ideas here..."
              rows="12"
              value={postData.description}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
              required
            ></textarea>
          </div>

          <div className="btn-group"> 
            <button type="submit" className="btn btn-create" disabled={loading}>
              {loading && !isDraft ? "Creating Post..." : "Create Post"}
            </button>

            <button 
              type="button" 
              className="btn btn-draft" 
              disabled={loading} 
              onClick={(e) => handleSubmit(e, true)} 
            >
              {loading && isDraft ? "Saving as Draft..." : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
