const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

const hsPath = 'highscores.json';

app.use(express.json())

// sendFile will go here
app.get('/', function(req, res) {
  const rawdata = fs.readFileSync(hsPath);
  const highscores = JSON.parse(rawdata);
  res.json(highscores)
});

app.post('/setHS', function(req, res) {
  console.log("set hs");
  
  const rawdata = fs.readFileSync(hsPath);
  const highscores = JSON.parse(rawdata);
  highscores.push({ name: req.body.name, score: req.body.score, date:new Date().toISOString() })
  fs.writeFileSync(hsPath, JSON.stringify(highscores));
  res.json('{ "ok": "cool" }');
})

app.listen(port);
console.log('Server started at ' + port);

