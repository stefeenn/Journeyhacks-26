const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

app.use(cors());

const upload = multer({ dest: 'uploads/' });

// Get your API key from https://aistudio.google.com/app/apikey
const API_KEY = 'AIzaSyAcGvYlahFIQ_4cDWjN_B_o_hGqYhSfzv4';
const genAI = new GoogleGenerativeAI(API_KEY);

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
<<<<<<< HEAD
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
=======
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
>>>>>>> parent of 5ac9847 (gemini changes)
    const prompt = 'Convert this image to a single HTML file with CSS and JavaScript. Do not use any external frameworks or libraries.';

    const imageParts = [
      {
        inlineData: {
          data: fs.readFileSync(req.file.path).toString('base64'),
          mimeType: req.file.mimetype,
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);

    res.json({ html: text });
  } catch (error) {
    console.error('Error processing image with Gemini:', error);
    res.status(500).json({ error: 'Error processing image.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
