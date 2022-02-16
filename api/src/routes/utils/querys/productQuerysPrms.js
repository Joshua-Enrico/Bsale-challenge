/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryBuilderPg(orderP, search, intPage, intSize, category) {
  let categoryId = "";

  if (category.length > 0) {
    categoryId = category[0].dataValues.id;
  }
  let Sort = "";
  if ((orderP && orderP === "ASC") || orderP === "DESC") {
    Sort = orderP;
  }

  return (
    "SELECT * FROM product WHERE category = " +
    `"${categoryId}"` +
    " or name LIKE '%" +
    search +
    "%' ORDER BY price " +
    Sort +
    " LIMIT 8 OFFSET " +
    intPage * intSize
  );
}

/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryBuilderSearch(search, orderP, category) {
  let categoryId = "";
  let Sort = "";

  if (category.length > 0) {
    categoryId = category[0].dataValues.id;
  }

  if ((orderP && orderP === "ASC") || orderP === "DESC") {
    Sort = orderP;
  }

  return (
    "SELECT * FROM product WHERE category = " +
    `"${categoryId}"` +
    " or name LIKE '%" +
    search +
    "%' ORDER BY price " +
    Sort +
    " LIMIT 8"
  );
}

/*  Query para contar registros encontrados */
function QueryCount(search, category) {
  let categoryId = " ";
  if (category.length > 0) {
    categoryId = category[0].dataValues.id;
  }

  return (
    "SELECT COUNT(*) FROM product WHERE category = " +
    `"${categoryId}"` +
    " or name LIKE '%" +
    search +
    "%'"
  );
}

/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryAll(orderP) {
  if ((orderP && orderP === "ASC") || orderP === "DESC") {
    return {
      limit: 8,
      order: [["price", `${orderP}`]],
    };
  } else {
    return {
      limit: 8,
    };
  }
}

/*  Esta Genera un query conditional dependiendo
    de los parametros envidados desde el cliente*/
function QueryAllPaginate(orderP, intSize, intPage) {
  console.log(orderP);
  if ((orderP && orderP === "ASC") || orderP === "DESC") {
    return {
      limit: intSize,
      offset: intPage * intSize,
      order: [["price", `${orderP}`]],
    };
  } else {
    return {
      limit: intSize,
      offset: intPage * intSize,
    };
  }
}

module.exports = {
  QueryBuilderPg,
  QueryBuilderSearch,
  QueryAll,
  QueryAllPaginate,
  QueryCount,
};
