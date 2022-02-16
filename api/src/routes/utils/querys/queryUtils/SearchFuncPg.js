const { QueryBuilderPg, QueryCount } = require("../productQuerysPrms");

async function SearchPaginate(
  sequelize,
  orderP,
  search,
  intPage,
  intSize,
  Products,
  Category
) {
  let data = {};
  let ctgrResult = "";

  /*  Hacemos un query a la tabla categoria, 
        para mejorar nuestra busqueda en la tabla productos  */
  await sequelize
    .query(`SELECT * FROM category WHERE name LIKE '%${search}'`, {
      model: Category,
      mapToModel: true,
    })
    .then((category) => {
      ctgrResult = category;
    })
    .catch((err) => {
      throw new Error(err);
    });

  await sequelize
    .query(QueryCount(search, ctgrResult), {
      model: Products,
      mapToModel: true,
    })
    .then((count) => {
      data["count"] = count[0].dataValues["COUNT(*)"];
    })
    .catch((err) => {
      throw new Error(err);
    });

  await sequelize
    .query(QueryBuilderPg(orderP, search, intPage, intSize, ctgrResult), {
      model: Products,
      mapToModel: true,
    })
    .then((products) => {
      data["rows"] = products;
    })
    .catch((err) => {
      throw new Error(err);
    });

  return data;
}

module.exports = { SearchPaginate };
