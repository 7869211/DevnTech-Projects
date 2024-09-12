import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ShowAllPosts.css";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [ loadig,setLoading] = useState(true);
  const [ error,setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
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
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-title-container">
                  <div className="post-title">{post.title}</div>
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
