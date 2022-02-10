/* Este modulo contiene todos los endpints para la tabla category */

const router = require('express').Router();// manejador de rutas
const db = require('../utils/database'); // manejador de base de datos
const initModels = require('../models/init-models'); // manejador de modelos
const Op = db.Sequelize.Op;// manejador de operaciones

const { FakeData } = require('../../fakeData/fakeData');// Data fake en caso de necesitarla en entorno dev
const { VldParams } = require('./utils/validations');// funcion para validar argumentos

// obtenemos nuestros querys conditionales desde este modulo
const { QueryParamsPg, QueryParams2, QueryAll, QueryAllPaginate } = require('./utils/productQuerysPrms');

/* instanciamos el modelo Products  */
var models = initModels(db.sequelize);
const Products = models.product;
const Category = models.category;


// Obtener todos los productos
/**
 * @swagger
 * tags:
      - "products"
 * /api/products/:
 *  get:
 *   description: Retonra todos los productos
 *   responses:
 *      '200':
 *         description: Retorna todas los productos
 *      '500': 
 *          description: Error en el servidor
 * 
 */
router.get("/", async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err);
    }
})


// crear contenido fake (solo usar en desarrollo)
/**
 * @swagger
 * /api/products/fake:
 *  get:
 *   description: Crea contenido fake en la base de datos, solo se usa en entorno de desarrollo
 *   responses:
 *      '200':
 *         description: Retorna todas los productos creados
 *      '500': 
 *          description: Error en el servidor
 * 
 */
router.post("/fake", async (req, res) => {

    try {
        const products = await Products.bulkCreate(
            FakeData
        );
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).send(err);
    }
});


/* Enpoint para obtener un producto por id */
/**
 * @swagger
 * /api/products/{productId}:
 *  parameters:
 *     - name: productId
 *  in: path
 *  description: id del producto
 *  required: true
 *  get:
 *   description: Obtiene un producto por id
 *   responses:
 *      '200':
 *         description: Retorna un producto por id
 *      '500': 
 *          description: Error en el servidor
 *      '404':
 *          description: El id es requerido
 * 
 */
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
/**
 * @swagger
 * /api/products/qty/{qty}:
 *  parameters:
 *     - name: qty
 *  in: path
 *  description: Retorna un numero de productos
 *  required: true
 *  get:
 *   description: Retorna un numero de productos
 *   responses:
 *      '200':
 *         description: Retorna un productos por qty
 *      '500': 
 *          description: Error en el servidor
 *      '400':
 *          description: El numero es requerido o no es valido
 * 
 */
router.get("/qty/:number", async (req, res) => {
    const number = parseInt(req.params.number);
    if (isNaN(number) || number < 1) {
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
/**
 * @swagger
 * /api/products/search/paginate/{search}?page={page}&limit={limit}&orderP={orderP}:
 *  parameters:
 *     - name: search
 *     - name: limit
 *     - name: page
 *     - name: orderP
 *  in: path
 *  description: Retorna un numero de productos por pagina y orden asc o desc
 *  required: true
 *  get:
 *   description: Retorna un numero de productos por pagina y orden asc o desc
 *   responses:
 *      '200':
 *         description: Retorna un productos por pagina y orden asc o desc
 *      '500': 
 *          description: Error en el servidor
 *      '400':
 *          description: Parametros invalidos
 * 
 */
router.get("/search/paginate/:search", async (req, res) => {
    try {
        const search = req.params.search;
        const { size, page, orderP } = req.query;
        // convertimos el size y page a int
        const intSize = parseInt(size);
        const intPage = parseInt(page);


        // validamos que el usuario envie argumentos validos
        const vldParams = VldParams(intSize, intPage, orderP);
        if (!vldParams.isValid) {
            return res.status(400).send(vldParams.message);
        }

        /*  Condicional especial, en caso de mandar un arugmento con la cadena "all",
            retornaremos todos los productos con conteo,
            el objetivo es mantener el endpoint versatil */
        if (search === "all") {
            const queryAll = QueryAllPaginate(orderP, intSize, intPage);// obtenemos un query conditional
            const products = await Products.findAndCountAll(queryAll);
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

        const query = QueryParamsPg(orderP, search, intPage, intSize, id, Op);// obtenemos un query conditional

        /* Query principal, usando el id resultante y el parametro search
           Haremos el query a la tabla productos.
        */
        const products = await Products.findAndCountAll(query);

        return res.status(200).json(products); // retornamos los productos por pagina
    } catch (err) {
        return res.status(500).send(err);
    }
})


/* Este enpoint busca productos basado en su categoria pero,
   tambien por nombre de producto */
/**
 * @swagger
 * /api/products/search/{search}?orderP={orderP}:
 *  parameters:
 *     - name: search
 *     - name: orderP
 *  in: path
 *  description: Retorna un productos por busqueda orden asc o desc
 *  required: true
 *  get:
 *   description: Retorna un productos por busqueda orden asc o desc
 *   responses:
 *      '200':
 *         description: Retorna un productos por busqueda orden asc o desc
 *      '500': 
 *          description: Error en el servidor
 *      '400':
 *          description: Parametros invalidos
 * 
 */
router.get("/search/:search", async (req, res) => {
    try {
        const search = req.params.search;// variable para la busqueda
        const { orderP } = req.query;// variable para el ordenamiento


        /* Condition especial, en caso de mandar un arugmento con la cadena "all",
                retornaremos todos los productos con conteo, el objetivo es mantener este 
                endpoint como principal para las busquedas */
        if (search === "all") {
            const queryAll = QueryAll(orderP);// obtenemos un query conditional
            const allproducts = await Products.findAndCountAll(queryAll);
            return res.status(200).json(allproducts);
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

        const query = QueryParams2(orderP, search, id, Op); // obtenemos un query conditional

        /* Query principal, usando el id resultante y el parametro search
           Haremos el query a la tabla productos.
        */
        const products = await Products.findAndCountAll(query);
        return res.status(200).json(products); // retornamos los productos



    } catch (err) {
        return res.status(500).send(err); //en caso de error retornamos el error
    }
})

module.exports = router;
