import React from "react";

export default function ComingSoon() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "#f5f7fb"
    }}>
      <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
        🚧 Coming Soon
      </h1>

      <p style={{ color: "gray" }}>
        {/* This feature is under development */}
      </p>
    </div>
  );
}