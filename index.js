'use strict';

var http = require('http');
var fs = require('fs');
var uuid = require('node-uuid');

var server = http.createServer(function(req, res, data) {
	
	var requestData = {};

	req.on('data', function(data) {
			requestData.contentType = req.headers['content-type'];
			requestData.requestData = JSON.parse(data);
	});

	req.on('end', function() {
		requestData.method = req.method;
		requestData.url = req.url;
		requestData.HttpVersion = req.httpVersion;
		requestData.host = req.headers.host;
		requestData.userAgent = req.headers['user-agent'];
	

	fs.writeFile('./log/' + uuid.v1() + '.txt', JSON.stringify(requestData), function(err) {
		if (err) { console.log(err) };
		console.log('File was written');
	});
		
	});



	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('Your request was processed');
	return res.end();
});

server.listen(3000, function() {
	console.log('server up');
});