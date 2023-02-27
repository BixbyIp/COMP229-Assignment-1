var express = require('express')
var app = require('./server/config/app')
var http = require('http')

var port = normalisePort(process.env.PORT || '8080')
app.set('port', port)

var server = http.createServer(app)

server.listen(port)

function normalisePort(val) {
    var port = parseInt(val, 10)
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }
