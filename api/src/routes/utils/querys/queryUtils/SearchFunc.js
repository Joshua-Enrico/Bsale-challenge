/* Este modulo ejecuta queries especificos a la db, la finalidad es isolar
   las funciones  */

// obtenemos nuestros querys conditionales desde este modulo
const { QueryCount, QueryBuilderSearch } = require("../productQuerysPrms");


async function Search(sequelize, search, orderP, Products, Category) {


    let data = {}; // resultado de la consulta Productos
    let ctgrResult = ""; // resultado de la consulta Categoria

    /*  Hacemos un query a la tabla categoria, 
        para mejorar nuestra busqueda en la tabla productos  */
    await sequelize.query(
        `SELECT * FROM category WHERE name LIKE '%${search}'`,
        { model: Category, mapToModel: true }

    ).then(category => {
        ctgrResult = category; // guardamos el resultado de la consulta
    }).catch(err => {
        throw new Error(err); // en caso de error, lanzamos un error
    });

    /* Obtenemos el numero de items encontrados */
    await sequelize.query(
        QueryCount(search, ctgrResult),
        { model: Products, mapToModel: true })

        .then(count => {
            data["count"] = count[0].dataValues["COUNT(*)"]; // guardamos el resultado de la consulta

        }).catch(err => {
            throw new Error(err); // en caso de error, lanzamos un error
        })

    /*  Query principal, usando el id resultante y el parametro search
        Haremos el query a la tabla productos*/
    await sequelize.query(
        QueryBuilderSearch(search, orderP, ctgrResult),
        { model: Products, mapToModel: true })
        .then(products => {
            data["rows"] = products; // guardamos el resultado de la consulta

        }).catch(err => {
            throw new Error(err); // en caso de error, lanzamos un error
        });

    return data; // retornamos los resultados de la consulta
}

module.exports = { Search };
