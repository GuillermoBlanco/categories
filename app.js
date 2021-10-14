const express = require('express');
const config = require('./config/server.config');

// App
const app = express();
app.set('port', process.env.NODE_DOCKER_PORT || process.env.port || config.NODE_DOCKER_PORT || 3000);

const init = require('./init');

init.express(app);
init.database(app);
init.routes(app);

module.exports = app;
