const express = require('express');
const path = require('path');
const rpc = require('discord-rpc');
const dotenv = require("dotenv")

dotenv.config()

const { readFileSync, writeFileSync, existsSync } = require('fs');

const client = new rpc.Client({ transport: 'ipc' });
const clientID = process.env.CLIENT_ID
client.login({ clientId: clientID }).catch(console.error);

const tmp = Date.now()

const app = express();
app.use(express.json())

if (!existsSync("presets.json")) {
  writeFileSync("presets.json", "[]")
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
  client.clearActivity();
});

app.get('/id', (req, res) => {
  res.send(clientID)
});

app.get('/style/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style/index.css'))
});

app.post('/clear', (req, res) => {
  client.clearActivity();
  res.sendStatus(200)
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(__dirname, '/favicon.ico'))
})

app.get("/presets", (req, res) => {
  res.send(readFileSync("presets.json"))
})

app.post("/savePreset", (req, res) => {
  let presets = JSON.parse(readFileSync("presets.json"))
  presets.push(req.body)
  writeFileSync("presets.json", JSON.stringify(presets))
  res.sendStatus(200)
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

let port = parseInt(process.argv[2]) || 8080

app.listen(port, function () {
  console.log(`Custom RPC Manager listening at port ${port} (http://localhost:${port})`);
});