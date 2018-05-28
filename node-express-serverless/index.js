const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/user/:userId', function (req, res) {
  res.send('Hello World! User: ' + req.params.userId)
})

app.get('/user/', function (req, res) {
  res.send('Hello World! All Users')
})

module.exports.handler = serverless(app);

module.exports.app = app;
//app.listen(3000, () => console.log('Example app listening on port 3000!'))