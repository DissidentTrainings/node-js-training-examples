var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
}).listen(9615);


server.on('connection', function() {
 console.log('connect');
});
