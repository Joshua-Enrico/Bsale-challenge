/* Este modulo contiene todos los endpints para la tabla category */

const router = require('express').Router();// manejador de rutas
const db = require('../utils/database'); // manejador de base de datos

const { FakeData } = require('../../fakeData/fakeData');// Data fake en caso de necesitarla en entorno dev
const { VldParams } = require('./utils/validations');// funcion para validar argumentos

// obtenemos nuestros querys conditionales desde este modulo
const {QueryAll, QueryBuilderSearch, QueryCount } = require('./utils/querys/productQuerysPrms');

/* instanciamos el modelo Products  */
const { Products, Category } = require('../models/StartModels');
const { FindCountPg, FindCount } = require('./utils/querys/productsQueries');


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

    await Products.findAll()
        .then(products => {
            return res.status(200).json(products);
        }).catch(err => {
            return res.status(500).send(err);
        })
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

    await Products.bulkCreate(FakeData)
        .then(products => {
            return res.status(200).json(products);
        })
        .catch(err => {
            return res.status(500).send(
                { message: "Verificar si tienes la data ya creada", err }
            );
        })

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
    } else {

        await Products.findByPk(id)
            .then(product => {
                return res.status(200).json(product);
            }).catch(err => {
                return res.status(500).send(err);
            })

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
    } else {
        await Products.findAll({
            limit: number
        })
            .then(product => {
                return res.status(200).json(product);
            }).catch(err => {
                return res.status(500).send(err);
            })

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
        const search = req.params.search;
        const { size, page, orderP } = req.query;
        // convertimos el size y page a int
        const intSize = parseInt(size);
        const intPage = parseInt(page);


        // validamos que el usuario envie argumentos validos
        const vldParams = VldParams(intSize, intPage, orderP);
        if (!vldParams.isValid) {

            return res.status(400).send(vldParams.message);

        } else {

        /*  Esta funcion maneja los querys a la db 
            Dentro de la funcion tenemos throw erros en caso de error 
            Automaticamente atrapa el error y mandamos status 500.
            Caso contrario retornamos la data solicitada*/
        await FindCountPg(orderP, search, intPage, intSize)
            .then(async (result) => {
                
                return res.status(200).json(result);
            }).catch(err => {

                return res.status(500).json(err);
            })

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

        const search = req.params.search;// variable para la busqueda
        const { orderP } = req.query;// variable para el ordenamiento

        /*  Esta funcion manejara todas nuestras consultas
            y errores que provengan de la misma */
        await FindCount(search, orderP)
        .then(async (result) => {

            return res.status(200).json(result);

        }).catch(err => {
            return res.status(500).json(err);
        })

})

module.exports = router;
