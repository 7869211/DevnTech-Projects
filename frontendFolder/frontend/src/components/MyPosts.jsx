import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ShowAllPosts.css";
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

export default function MyPosts() {
  const [state, setState] = useState({
    posts: [],
    loading: true,
    error: null,
    activeDropdown: null
  });
  const navigate = useNavigate();
  const { getToken, decodeToken } = useToken(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getToken();
        const response = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allPosts = response.data;

        const publishedPosts = allPosts.filter(post => post.status === 'published');
        setState(prev => ({
          ...prev,
          posts: publishedPosts,
          loading: false
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          error: "Error fetching posts",
          loading: false
        }));
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleDropdown = (id) => {
    setState(prev => ({
      ...prev,
      activeDropdown: prev.activeDropdown === id ? null : id
    }));
  };

  const handleDeletePost = async (postId) => {
    const token = getToken();
    const userId = decodeToken()?.id;

    if (!userId) {
      alert("User not authenticated.");
      return;
    }

    try {
      const postResponse = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const post = postResponse.data;

      if (post.author_id !== userId) {
        alert("You are not authorized to delete this post.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setState(prev => ({
        ...prev,
        posts: prev.posts.filter(post => post.id !== postId)
      }));
      alert("Post deleted successfully");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete the post. You may not be authorized.");
    }
  };

  const handleEditPost = async (postId) => { 
    const token = getToken();

    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const post = response.data;
        const currentUserId = decodeToken()?.id;

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

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return <div>{state.error}</div>;
  }

  return (
    <section className="posts-section">
      <div className="container">
        <div className="header">
          <h2>My Posts</h2>
        </div>

        <div className="posts-grid">
          {state.posts.length === 0 ? (
            <h1 className="no-posts">No Post Found</h1>
          ) : (
            state.posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-title-container">
                  <div className="post-title">{post.title}</div>

                  <div className="dropdown-wrapper">
                    <span className="three-dots" onClick={() => toggleDropdown(post.id)}>
                      ...
                    </span>
                    {state.activeDropdown === post.id && (
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
