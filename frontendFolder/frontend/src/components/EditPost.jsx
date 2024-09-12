import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EditPost.css";
import {jwtDecode} from 'jwt-decode'; 

const useToken = () => {
  const getToken = () => localStorage.getItem("token");
  const decodeToken = () => {
    const token = getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  return { getToken, decodeToken };
};

export default function EditPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    status: "", 
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getToken } = useToken(); 

  useEffect(() => {
    const fetchPost = async () => {
      const token = getToken();
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setPostData({
            title: response.data.title,
            content: response.data.content,
            status: response.data.status || 'draft',
          });
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Error fetching post details.");
      }
    };

    fetchPost();
  }, [id, getToken]);

  const handleUpdatePost = async () => {
    const token = getToken();
    if (!token) {
      setError("No authentication token found.");
      return;
    }

    if (!postData.status) {
      alert("Post status cannot be null. Please set a valid status.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        postData,
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
          value={postData.title}
          onChange={(e) => setPostData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <textarea
          value={postData.content}
          onChange={(e) => setPostData(prev => ({ ...prev, content: e.target.value }))}
          rows="10"
          required
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          value={postData.status}
          onChange={(e) => setPostData(prev => ({ ...prev, status: e.target.value }))}
          required
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <button onClick={handleUpdatePost}>Save</button>
    </div>
  );
}
