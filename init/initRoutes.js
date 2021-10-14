const categories = require("../controllers/category.controller.js");

module.exports = app => {

  /**
  * Create a new Category
  * @name categories
  * @function
  * @inner
  * @param {string} path - Express path
  * @param {callback} middleware - Express middleware that authenticates the session.
  */
  app.post("/categories", categories.create);

  // Retrieve all Categories
  app.get("/categories", categories.findAll);

  // Retrieve a single Category with categoryId
  app.get("/categories/:categoryId", categories.findOne);

  // Update a Category with categoryId
  app.put("/categories/:categoryId", categories.update);

  // Delete a Category with categoryId
  app.delete("/categories/:categoryId", categories.delete);

  // Create a new Category
  app.delete("/categories", categories.deleteAll);
}