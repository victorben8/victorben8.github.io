const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
	
	if (request.url == '/player.jpeg') {
		fs.readFile("imgs/player.jpeg", function (err, data) {
			if (err) {
				console.error(err);
				return;
			}

			response.writeHead(200, {"Content-Type": "image/jpeg"});
			response.write(data);
		});
	}

	fs.readFile("index.html", function (err, data) {

		if (err) {
			console.error(err);
			return;
		}

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);

		response.end();
	
	});
	
}).listen(6969);