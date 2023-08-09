const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/submit', (req, res) => {
  const formData = req.body;
  console.log('Received data from client:', formData);

  // 여기서 데이터를 처리하고 응답을 보낼 수 있습니다.

  res.json({ message: 'Data received and processed on the server.' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
