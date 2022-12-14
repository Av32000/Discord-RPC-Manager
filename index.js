const express = require('express');
const path = require('path');
const rpc = require('discord-rpc');

const client = new rpc.Client({ transport: 'ipc' });
client.login({ clientId: "945966822136639599" }).catch(console.error);

let tmp = Date.now()

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
  client.clearActivity();
});

app.get('/style/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style/index.css'))
});

app.post('/clear', (req, res) => {
  client.clearActivity();
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, '/favicon.ico'))
})

app.post("/update", (req, res) => {
  if (req.body.imgsid != "") {
    client.setActivity({
      details: req.body.li1,
      state: req.body.li2,
      largeImageKey: req.body.img,
      largeImageText: req.body.imgtxt,
      smallImageKey: req.body.imgsid,
      smallImageText: req.body.imgstxt,
      startTimestamp: Date.now()
    }).catch(console.error);
  } else {
    client.setActivity({
      details: req.body.li1,
      state: req.body.li2,
      largeImageKey: req.body.img,
      largeImageText: req.body.imgtxt,
      startTimestamp: tmp
    }).catch(console.error);
  }
  res.sendStatus(200)
})

app.listen(8080, function () {
  console.log('Custom RPC Manager listening at port 8080 (http://localhost:8080)');
});