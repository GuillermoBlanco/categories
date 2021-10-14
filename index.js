var app = require('./app');
const path = require('path');
var http = require('http');
var https = require('https');
var config = require('./config/server.config');

require("dotenv").config();

const isHTTPS = config.protocol === 'https';

let PORT;

const options = {};

if (isHTTPS) { 
  const sslDir = path.join(__dirname, '../ssl');
  try {
    options.key = fs.readFileSync(path.join(sslDir, 'server.key'));
    options.cert = fs.readFileSync(path.join(sslDir, 'server.crt'));
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error;
    var { key, cert} = require('openssl-self-signed-certificate');

    options.key = key;
    options.cert = cert;
  }
}

PORT = app.get('port');

if (isHTTPS) {
  https.createServer(options, app).listen(PORT, (error) => {
    if (error) {
      console.error(error);
      onError(error);
    }
    console.info('==> 💻  Open https://%s:%s in a browser to view the app.', 'localhost', PORT);
  });
} else {
  http.createServer(app).listen(PORT, (error) => {
    if (error) {
      console.error(error);
      onError(error);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', 'localhost', PORT);
  });
}

/**
 * Event listener for HTTP server "error" event.
 * server.on('error', onError);
 * 
 */

 function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof PORT === 'string'
      ? 'Pipe ' + PORT
      : 'Port ' + PORT;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

//   /**
//  * Event listener for HTTP server "listening" event.
//  * server.on('listening', onListening);
//  */

// function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string'
//       ? 'pipe ' + addr
//       : 'port ' + addr.port;
//     console.log('Listening on ' + bind);
//   }