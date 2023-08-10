const express = require('express');
const aws = require("aws-sdk");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit', (req, res) => {
  const formData = req.body;
  console.log('Received data from client:', formData);
  res.json({ message: 'Data received and processed on the server.' });
});

app.get('/api/submit', (req, res) => {
  res.json({ message: 'GET request to submit endpoint' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
