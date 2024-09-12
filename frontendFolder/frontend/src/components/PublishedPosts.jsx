import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ShowAllPosts.css";

export default function MyPosts() {
  const [state, setState] = useState({
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data: allPosts } = await axios.get("http://localhost:5000/api/posts");
        const publishedPosts = allPosts.filter(post => post.status === 'published');
        
        setState(prevState => ({
          ...prevState,
          posts: publishedPosts,
          loading: false
        }));
      } catch (err) {
        setState(prevState => ({
          ...prevState,
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

  const { posts, loading, error } = state;

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
          <h2>Published Posts</h2>
        </div>

        <div className="posts-grid">
          {posts.length === 0 ? (
            <h1 className="no-posts">No Published Post Found</h1>
          ) : (
            posts.map(({ id, title, content, author_id, created_at }) => (
              <div key={id} className="post-card">
                <div className="post-title-container">
                  <div className="post-title">{title}</div>
                </div>

                <div className="post-content">
                  <p className="post-description">{content}</p>
                </div>

                <div className="post-footer">
                  <p className="post-author">AuthorID: {author_id}</p>
                  <p className="post-date">{formatDate(created_at)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
