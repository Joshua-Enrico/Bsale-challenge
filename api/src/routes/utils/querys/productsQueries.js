const { Products, Category } = require("../../../models/StartModels"); // Obtener todos los Modelos
const db = require("../../../utils/database"); // manejador de base de datos

// obtenemos nuestros querys conditionales desde este modulo
const { QueryAllPaginate, QueryAll } = require("./productQuerysPrms");
const { Search } = require("./queryUtils/SearchFunc");
const { SearchPaginate } = require("./queryUtils/SearchFuncPg");

/* Funcion que maneja queries especificos, retorna valor o error */
async function FindCountPg(orderP, search, intPage, intSize) {
  let data = ""; // resultado de la consulta Productos

  /*  Condicional especial, en caso de mandar un arugmento con la cadena "all",
        retornaremos todos los productos con conteo,
        el objetivo es mantener el endpoint versatil */
  if (search === "all") {
    await Products.findAndCountAll(QueryAllPaginate(orderP, intSize, intPage))
      .then((products) => {
        data = products;
        return products;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return data; // retornamos el resultado de la consulta
  } else {
    /*  Haremos los querys de busqueda, para cada query estamos usando una funcion,
         que armara el query segun los parametros que estemos enviando  */
    await SearchPaginate(
      db.sequelize,
      orderP,
      search,
      intPage,
      intSize,
      Products,
      Category
    )
      .then((result) => {
        data = result;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return data; // retornamos el resultado de la consulta
  }
}

/* Funcion que maneja queries especificos, retorna valor o error */
async function FindCount(search, orderP) {
  let data = ""; // resultado de la consulta Productos

  /* Condition especial, en caso de mandar un arugmento con la cadena "all",
        retornaremos todos los productos con conteo, el objetivo es mantener este 
        endpoint como principal para las busquedas */
  if (search === "all") {
    await Products.findAndCountAll(QueryAll(orderP))
      .then((products) => {
        data = products; // guardamos el resultado de la consulta
      })
      .catch((err) => {
        throw new Error(err);
      });

    return data; // retornamos el resultado de la consulta
  } else {
    await Search(db.sequelize, search, orderP, Products, Category)
      .then((result) => {
        data = result; // guardamos el resultado de la consulta
      })
      .catch((err) => {
        throw new Error(err); // en caso de error, lanzamos un error
      });

    return data; // retornamos el resultado de la consulta
  }
}

module.exports = { FindCountPg, FindCount };
