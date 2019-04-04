console.log('Server-side code running');

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(express.static('public'));
let db;
const url  = process.env.MONGODB_URI;

MongoClient.connect(url, function(err, client) {
  if(err) console.log(err);
  db = client.db("univdata");
  
  app.listen( process.env.PORT || 8000, () => {
    console.log('listening');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};

  db.collection('clicks').save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    res.sendStatus(201);
  });
});

app.get('/clicks', (req, res) => {
  db.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});