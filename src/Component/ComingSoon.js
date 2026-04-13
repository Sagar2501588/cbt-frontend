import React from "react";
import "./ComingSoon.css";

export default function ComingSoon() {
  return (
    <div className="comingWrapper">

      <div className="comingBox">
        <h1>🚧 Coming Soon</h1>

        <p>
          This feature is under development.
        </p>

        <button onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>

    </div>
  );
}