const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

app.get('/style/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style/index.css'))
});

app.listen(8080, function () {
  console.log('Custom RPC Manager listening at port 8080');
});