/* Este modulo contiene todos los endpints para la tabla category */

const router = require('express').Router();// manejador de rutas
const db = require('../utils/database'); // manejador de base de datos
const initModels = require('../models/init-models'); // manejador de modelos
const Op = db.Sequelize.Op;// manejador de operaciones

const { FakeData } = require('../../fakeData/fakeData');// Data fake en caso de necesitarla en entorno dev
const { VldParams } = require('./utils/validations');// funcion para validar argumentos

/* instanciamos el modelo Products  */
var models = initModels(db.sequelize);
const Products = models.product;
const Category = models.category;


// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err);
    }
})


// crear contenido fake (solo usar en desarrollo)
router.post("/fake", async (req, res) => {

    try {
        const product = await Products.bulkCreate(
            FakeData
        );
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).send(err);
    }
});


/* Enpoint para obtener un producto por id */
router.get("/:productId", async (req, res) => {
    const id = req.params.productId;
    if (!id) {
        res.status(400).send("El id es requerido");
    }
    try {
        const prodcut = await Products.findByPk(id);
        return res.status(200).json(prodcut);
    } catch (err) {
        return res.status(500).send(err);
    }
})


/* obtener un numero de productos por input */
router.get("/qty/:number", async (req, res) => {
    const number = parseInt(req.params.number);
    if (number === NaN || number < 1) {
        res.status(400).send("El numero es requerido o no es valido");
    }
    try {
        const product = await Products.findAll({
            limit: number
        });
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).send(err);
    }
})


/* Este Endpoint busca productos por paginacion,
   cateogia y nombre de producto   */
router.get("/search/paginate/:search", async (req, res) => {
    try {
        const search = req.params.search;
        const { size, page } = req.query;
        // convertimos el size y page a int
        const intSize = parseInt(size);
        const intPage = parseInt(page);


        // validamos que el usuario envie un argumento validos
        const vldParams = VldParams(intSize, intPage);
        if (!vldParams.isValid) {
            console.log("returned");
            return res.status(400).send(vldParams.message);
        }

        /*  Condicional especial, en caso de mandar un arugmento con la cadena "all",
            retornaremos todos los productos con conteo,
            el objetivo es mantener el endpoint versatil */
        if (search === "all") {
            const products = await Products.findAndCountAll(
                {
                    limit: intSize,
                    offset: intPage * intSize,
                });
            return res.status(200).json(products);
        }

        /* Hacemos un query a la tabla categoria, 
        para mejorar nuestra busqueda en la tabla productos  */
        const category = await Category.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `%${search}%` } },
                ]
            }
        });

        const id = category[0].id;// obtenemos el id de la categoria

        /* Query principal, usando el id resultante y el parametro search
           Haremos el query a la tabla productos.
        */
        const products = await Products.findAndCountAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { category: id }
                ]
            },
            limit: intSize,// limite de productos por pagina
            offset: intPage * intSize, // numero de pagina
        });

        return res.status(200).json(products); // retornamos los productos por pagina
    } catch (err) {
        return res.status(500).send(err);
    }
})


/* Este enpoint busca productos basado en su categoria pero,
   tambien por nombre de producto */
router.get("/search/:search", async (req, res) => {
    try {
        const search = req.params.search;// variable para la busqueda

        /* Condition especial, en caso de mandar un arugmento con la cadena "all",
        retornaremos todos los productos con conteo, el objetivo es mantener este 
        endpoint como principal para las busquedas */
        if (search === "all") {
            const products = await Products.findAndCountAll(
                {
                    limit: 8,
                });
            return res.status(200).json(products);
        }

        /* Hacemos un query a la tabla categoria, 
        para mejorar nuestra busqueda en la tabla productos  */
        const category = await Category.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.substring]: `%${search}%` } },
                ]
            }
        });

        const id = category[0].id; // obtenemos el id de la categoria

        /* Query principal, usando el id resultante y el parametro search
           Haremos el query a la tabla productos.
        */
        const products = await Products.findAndCountAll(
            {
                where: {
                    [Op.or]: [
                        { name: { [Op.substring]: `%${search}%` } },
                        { category: id }
                    ]
                },
                limit: 8, // el numero de productos por pagina sera de 8 por defecto
            });
        return res.status(200).json(products); // retornamos los productos



    } catch (err) {
        return res.status(500).send(err); //en caso de error retornamos el error
    }
})

module.exports = router;
