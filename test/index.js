const express = require('express')
const app = express()
const port = 3000

var path = require('path'),
    bodyParser = require('body-parser'),
    api = require('./api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use('/api', api)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))