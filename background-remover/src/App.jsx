import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [processedImage, setProcessedImage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image); // Corrected formData.append usage

    try {
      const response = await axios.post('http://localhost:5000/remove-bg', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProcessedImage(response.data.processedImageUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Image Background Remover</h1>
      <div className="upload-section">
        <label className="upload-button">
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
        </label>
      </div>
      <div className="image-container">
        <div className="preview-section">
          <h3>Original Image</h3>
          {previewImage && <img src={previewImage} alt="Preview" />}
        </div>
        <div className="result-section">
          <h3>Processed Image</h3>
          {processedImage && (
            <>
              <img src={processedImage} alt="Processed" />
              <a href={processedImage} download className="download-button">Download Image</a>
            </>
          )}
        </div>
      </div>
      <button className="process-button" onClick={handleSubmit}>Remove Background</button>
    </div>
  );
};

export default App;
