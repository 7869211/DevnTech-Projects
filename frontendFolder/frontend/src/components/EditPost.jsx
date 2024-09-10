import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EditPost.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(""); // Include status in state
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem("token");
  
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/get_post_by_id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          const post = response.data;
          setTitle(post.title);
          setContent(post.content);
  
          // Set the status from the post; fallback to 'draft' or 'published'
          setStatus(post.status || 'draft');
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Error fetching post details.");
      }
    };
  
    fetchPost();
  }, [id]);
  

  const handleUpdatePost = async () => {
    const token = localStorage.getItem("token");
  
    // Ensure that status is not null or undefined
    if (!status) {
      alert("Post status cannot be null. Please set a valid status.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/update_post/${id}`,
        {
          title,
          content,
          status, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      if (response.status === 200) {
        alert("Post updated successfully.");
        navigate("/myposts"); 
      }
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update the post.");
    }
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          required
        />
      </div>

     

      <button onClick={handleUpdatePost}>Save</button>
    </div>
  );
}
