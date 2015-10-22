var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log("listening 4080");
server.listen(4080);

app.use('/', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var controllers = -1;

io.on('connection', function (socket) {
  socket.on('registerController', function(data) {
    controllers++;
    controllers = controllers % 3;
    var controller = controllers;

    socket.emit('registeredController', controller);

    socket.on('devicemotion', function (data) {
      // console.log(data);
      socket.broadcast.emit('visualizeDevicemotion', {controller: controller, data: data});
    });

    socket.on('deviceorientation', function (data) {
      // console.log(data);
      socket.broadcast.emit('visualizeDeviceorientation', {controller: controller, data: data});
    });
  });
});
