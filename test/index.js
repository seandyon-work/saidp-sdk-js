const express = require('express');
const app = express();
const port = 3000;

var path = require('path'),
    bodyParser = require('body-parser'),
    api = require('./api');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, "static")));
app.use('/api', api);

// Default every route except the above to serve the index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));