import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { urlFor } from "../sanity";
import "./BlogDetails.css";

function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://api.geomaticsgalaxy.com/api/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.result);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>{blog.title}</h1>

      {blog.mainImage && (
        <img
          src={urlFor(blog.mainImage).width(1200).url()}
          alt={blog.title}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            marginBottom: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        />
      )}
      <PortableText value={blog.body} />
    </div>
  );
}

export default BlogDetails;