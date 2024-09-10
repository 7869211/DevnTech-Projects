import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ShowAllPosts.css";
import {jwtDecode} from 'jwt-decode';


export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts/showAllPosts");
        const allPosts = response.data;
  
        const publishedPosts = allPosts.filter(post => post.status === 'published');
        
        setPosts(publishedPosts);
        setLoading(false);
      } catch (err) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(`http://localhost:5000/api/posts/delete_post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove frontend
        setPosts(posts.filter((post) => post.id !== postId));
        alert("Post deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete the post. You may not be authorized.");
    }
  };

  // Handle editing the post
  
const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;  
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const handleEditPost = async (postId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`http://localhost:5000/api/posts/get_post_by_id/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const post = response.data;

      const currentUserId = getUserIdFromToken();

      if (post.author_id !== currentUserId) {
        alert("You are not authorized to edit this post.");
        return;
      }

      navigate(`/edit/${postId}`);
    }
  } catch (err) {
    console.error("Error fetching post details for authorization:", err);
    alert("Failed to verify authorization.");
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="posts-section">
      <div className="container">
        <div className="header">
          <h2>My Posts</h2>
        </div>

        <div className="posts-grid">
          {posts.length === 0 ? (
            <h1 className="no-posts">No Post Found</h1>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-title-container">
                  <div className="post-title">{post.title}</div>

                  <div className="dropdown-wrapper">
                    <span className="three-dots" onClick={() => toggleDropdown(post.id)}>
                      ...
                    </span>
                    {activeDropdown === post.id && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => handleEditPost(post.id)}>
                          Edit
                        </button>
                        <button className="dropdown-item" onClick={() => handleDeletePost(post.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="post-content">
                  <p className="post-description">{post.content}</p>
                </div>

                <div className="post-footer">
                  <p className="post-author">AuthorID: {post.author_id}</p>
                  <p className="post-date">{formatDate(post.created_at)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
