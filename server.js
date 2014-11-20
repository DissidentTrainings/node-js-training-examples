var http = require('http');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var fs = require('fs');
require('newrelic');


var index = fs.readFileSync('index.html');

if (cluster.isMaster) {
   // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
 
   cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    newrelic.recordMetric('request', 1);
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);
}
