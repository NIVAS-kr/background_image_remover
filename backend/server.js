const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const app = express();
const upload = multer();

app.use(cors());

app.post('/remove-bg', upload.single('image'), async (req, res) => {
  const formData = new FormData();
  formData.append('image_file', req.file.buffer, req.file.originalname);
  
  const apiKey = '7aVRPpjW2zVyegZs8cb2YwTY';

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': apiKey
      },
      responseType: 'arraybuffer'
    });

    const base64Image = Buffer.from(response.data).toString('base64');
    const imageUrl = `data:image/png;base64,${base64Image}`;

    res.json({ processedImageUrl: imageUrl });
  } catch (error) {
    // Check if there is a response buffer from the API
    if (error.response && error.response.data) {
      const errorData = Buffer.from(error.response.data).toString('utf-8'); // Convert buffer to string
      console.error('Error with remove.bg API:', JSON.parse(errorData)); // Parse and log the error
    } else {
      console.error('Error:', error.message);
    }

    res.status(500).json({ error: 'Failed to process image' });
  }
});



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
