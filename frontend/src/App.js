import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [html, setHtml] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setHtml(data.html);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sketch to HTML</h1>
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleSubmit}>Generate HTML</button>
      </header>
      <main>
        <div className="preview">
          <h2>Image Preview</h2>
          {image && <img src={URL.createObjectURL(image)} alt="Sketch preview" />}
        </div>
        <div className="html-output">
          <h2>Generated HTML</h2>
          <textarea value={html} readOnly />
        </div>
        <div className="live-preview">
          <h2>Live Preview</h2>
          <iframe srcDoc={html} title="Live Preview" />
        </div>
      </main>
    </div>
  );
}

export default App;
