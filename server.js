var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log("listening 4080");
server.listen(4080);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.emit('visualize', {z: 1});

  socket.on('devicemotion', function (data) {
    // console.log(data);
    socket.broadcast.emit('visualize', data);
  });
});
