var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var port = 2017;

var index = fs.readFileSync('index.html');
function sendError(errCode, errString, response) {
	// Fonction pour envoyer des erreurs
	response.writeHead(errCode, {"Content-Type": "text/plain"});
	response.write(errString + "\n");
	response.end();
	return;
}

function sendFile(err, file, response) {
	// fonction pour envoyer les fichiers
	if(err)
		return sendError(500, err, response);
	response.writeHead(200);
	response.write(file, "binary");
	response.end();
}

function getFile(err, response, localpath) {
	// Fonction pour lire des fichiers
	if(err)
		return sendError(404, '404 Not Found', response);
	fs.readFile(localpath, function(err, file){ sendFile(err, file, response);});
}

function getFilename(request, response) {
	// Une fonction qui renvoie le chemin vers le fichier demandé
	var urlpath = url.parse(request.url).pathname;
	if(urlpath === '/')
		urlpath = 'index.html'
	var localpath = path.join(process.cwd(), urlpath);
	fs.access(localpath, fs.constants.F_OK, function(err) { getFile(err, response, localpath)});
}

var server = http.createServer(getFilename);
server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on localhost:${port}`)
})
