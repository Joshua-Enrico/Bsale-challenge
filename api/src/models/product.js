const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "product_name",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "product_price",
        using: "BTREE",
        fields: [
          { name: "price" },
        ]
      },
      {
        name: "product_discount",
        using: "BTREE",
        fields: [
          { name: "discount" },
        ]
      },
      {
        name: "product_category",
        using: "BTREE",
        fields: [
          { name: "category" },
        ]
      },
    ]
  });
};
