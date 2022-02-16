const initModels = require('./init-models');
const db = require('../utils/database');

var models = initModels(db.sequelize);
const Products = models.product;
const Category = models.category;

module.exports = { Products, Category };