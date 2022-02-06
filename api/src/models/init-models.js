var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _product = require("./product");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);

  product.belongsTo(category, { as: "category_category", foreignKey: "category"});
  category.hasMany(product, { as: "products", foreignKey: "category"});

  return {
    category,
    product,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
