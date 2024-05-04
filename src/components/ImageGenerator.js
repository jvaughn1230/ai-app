import React, { useState } from "react";

const ImageGenerator = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [imageData, setImageData] = useState("");
  const [error, setError] = useState("");

  const handleGenerateImage = async () => {
    try {
      const response = await fetch("http://localhost:3500/detect-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await response.json();
      setImageData(data.imageData);
      setError("");
    } catch (error) {
      setError("Error generating image");
      console.error("Error generating image:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <button onClick={handleGenerateImage}>Generate Image</button>
      {error && <div className="error">{error}</div>}
      {imageData && (
        <div>
          <h2>Results:</h2>
          <img src={inputUrl} alt="results" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
