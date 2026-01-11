import { useState } from 'react';
import './App.css';

const extractHtml = (markdownText) => {
  if (!markdownText) return '';
  // Regex to find content between ```html and ``` OR just ``` and ```
  const codeBlockRegex = /```(?:html)?([\s\S]*?)```/;
  const match = markdownText.match(codeBlockRegex);
  return match ? match[1].trim() : markdownText;
};

function App() {
  const [image, setImage] = useState(null);
  const [rawResponse, setRawResponse] = useState(''); // Stores full AI text (for middle box)
  const [cleanHtml, setCleanHtml] = useState('');     // Stores only code (for preview)

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
      const fullText = data.html; 
      
      setRawResponse(fullText);           // Put full text in the middle box
      setCleanHtml(extractHtml(fullText)); // Put filtered code in the iframe
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Draw and Scan</h1> 
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
          <textarea value={rawResponse} readOnly />
        </div>
        <div className="live-preview">
          <h2>Live Preview</h2>
          <iframe srcDoc={cleanHtml} title="Live Preview" />
        </div>
      </main>
    </div>
  );
}

export default App;
