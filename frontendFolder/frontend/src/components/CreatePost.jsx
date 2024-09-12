import React, { useState } from "react";
import axios from "axios";
import "../styles/CreatePost.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [state, setState] = useState({
    postData: { title: "", description: "" },
    loading: false,
    error: null,
    success: false,
    isDraft: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e, draft = false) => {
    e.preventDefault();
    setState(prevState => ({ ...prevState, loading: true, error: null, success: false, isDraft: draft }));

    const token = localStorage.getItem("token");

    if (!token) {
      setState(prevState => ({ ...prevState, error: "You must be logged in to create a post.", loading: false }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title: state.postData.title,
          content: state.postData.description,
          status: draft ? "draft" : "published",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log(`${draft ? "Draft" : "Post"} created successfully:`, response.data);
      setState(prevState => ({
        ...prevState,
        success: true,
        postData: { title: "", description: "" } 
      }));

      navigate(draft ? '/draftposts' : '/myposts');
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message || "Failed to create post. Please try again." : "An unexpected error occurred. Please try again.";
      setState(prevState => ({ ...prevState, error: errorMessage }));
    } finally {
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-box">
        <h2>Create a New Post</h2>

        {state.success && <p className="success-msg">{state.isDraft ? "Draft" : "Post"} created successfully!</p>}
        {state.error && <p className="error-msg">{state.error}</p>}

        <form onSubmit={(e) => handleSubmit(e, false)} className="form">
          <div className="form-group title-group">
            <input
              type="text"
              className="text-editor-input"
              placeholder="Enter post title..."
              value={state.postData.title}
              onChange={(e) => setState(prevState => ({
                ...prevState,
                postData: { ...prevState.postData, title: e.target.value }
              }))}
              required
            />
          </div>

          <div className="form-group description-group">
            <textarea
              className="text-editor-area"
              placeholder="Pen down your ideas here..."
              rows="12"
              value={state.postData.description}
              onChange={(e) => setState(prevState => ({
                ...prevState,
                postData: { ...prevState.postData, description: e.target.value }
              }))}
              required
            ></textarea>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-create" disabled={state.loading}>
              {state.loading && !state.isDraft ? "Creating Post..." : "Create Post"}
            </button>

            <button 
              type="button" 
              className="btn btn-draft" 
              disabled={state.loading} 
              onClick={(e) => handleSubmit(e, true)}
            >
              {state.loading && state.isDraft ? "Saving as Draft..." : "Save as Draft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
