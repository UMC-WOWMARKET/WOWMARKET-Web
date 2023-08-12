//데이터 처리 확인용 서버 구현(추후에 삭제 예정)

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post('http://13.125.190.15:8080/wowmarket/register/project', (req, res) => {
  const formData = req.body;
  console.log('Received data from client:', formData);
  res.json({ message: 'Data received and processed on the server.' });
});

app.get('http://13.125.190.15:8080/wowmarket/register/project', (req, res) => {
  res.json({ message: 'GET request to submit endpoint' });
});

