import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.geomaticsgalaxy.com/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="blog-container">
        <h1 className="blog-heading">Latest Blogs</h1>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Latest Blogs</h1>

      <div className="blog-grid">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.slug?.current}`}
            key={blog._id}
            style={{ textDecoration: "none" }}
          >
            <div className="blog-card">
              <div className="blog-content">
                <h2 className="blog-title">{blog.title}</h2>

                <p className="blog-excerpt">
                  {blog.excerpt?.slice(0, 120)}...
                </p>

                <span className="read-more">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BlogList;