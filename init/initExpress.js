var cors = require('cors');
const bodyParser = require('body-parser');

module.exports = function initExpress(app) {
  app.use(cors());

  //TODO initialize session

  //bodyParser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));

  //TODO // Serve static assets
}