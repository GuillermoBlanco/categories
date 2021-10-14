const database = require("../models/db");

module.exports = function initDatabase(app) {
  // app.set('db', new MyDAO(config));
  app.set('db', database);
}