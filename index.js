const express = require('express');
const path = require('path');
const rpc = require('discord-rpc');

const client = new rpc.Client({ transport: 'ipc' });
client.login({ clientId: "945966822136639599" }).catch(console.error);

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

app.post("/update", (req, res) => {
  let tmp
  if (req.body.temp == 1) {
    tmp = Date.now()
  } else {
    tmp = req.body.temp
  }


  client.setActivity({
    details: req.body.li1,
    state: req.body.li2,
    largeImageKey: req.body.img,
    largeImageText: req.body.imgtxt,
    smallImageKey: req.body.imgsid,
    smallImageText: req.body.imgstxt,
    startTimestamp: tmp
  }).catch(console.error);
  res.sendStatus(200)
})

app.listen(8080, function () {
  console.log('Custom RPC Manager listening at port 8080');
});