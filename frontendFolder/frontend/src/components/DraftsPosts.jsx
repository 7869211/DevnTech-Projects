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

export default function DraftPosts() {
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
        const response = await axios.get("http://localhost:5000/api/posts");
        const draftPosts = response.data.filter(post => post.status === 'draft');
        setState(prev => ({ ...prev, posts: draftPosts, loading: false }));
      } catch (err) {
        setState(prev => ({ ...prev, error: "Error fetching posts", loading: false }));
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleDropdown = (id) => {
    setState(prev => ({ ...prev, activeDropdown: prev.activeDropdown === id ? null : id }));
  };

  const handlePublishPost = async (postId) => {
    const token = getToken();
    if (!token) return;

    try {
      const fetchPostResponse = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (fetchPostResponse.status === 200) {
        const post = fetchPostResponse.data;
        const response = await axios.put(
          `http://localhost:5000/api/posts/${postId}`,
          { title: post.title, content: post.content, status: "published" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          setState(prev => ({
            ...prev,
            posts: prev.posts.filter(post => post.id !== postId)
          }));
          alert("Post published successfully");
          navigate("/myposts");
        }
      }
    } catch (err) {
      console.error("Error publishing post:", err);
      alert("Failed to publish the post. You may not be authorized.");
    }
  };

  const handleEditPost = async (postId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
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

  const { posts, loading, error, activeDropdown } = state;

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
          <h2>My Drafts</h2>
        </div>

        <div className="posts-grid">
          {posts.length === 0 ? (
            <h1 className="no-posts">No Drafts Found</h1>
          ) : (
            posts.map(post => (
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
                        <button className="dropdown-item" onClick={() => handlePublishPost(post.id)}>
                          Publish
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
