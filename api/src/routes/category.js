/* Este modulo contiene todos los endpints para la tabla productos */

const router = require('express').Router();// manejador de rutas
const db = require('../utils/database'); // manejador de base de datos
const initModels = require('../models/init-models'); // manejador de modelos
const { FakeDataCtry } = require('../../fakeData/fakeData');

/* instanciamos el modelo Category  */
var models = initModels(db.sequelize);
const Category = models.category;

// Obtener todos las categorias
/**
 * @swagger
 * /api/category/:
 *  get:
 *   description: Retorna todas las categorias
 *   responses:
 *      '200':
 *         description: Retorna todas las categorias
 * 
 */
router.get("/", async (req, res) => {

    await Category.findAll()
    .then(categories => {
        res.status(200).json(categories);
    }).catch(err => {
        res.status(500).send(err);
    });

})


// Crear categorias (!solo usar en desarrollo)
/**
 * @swagger
 * /api/category/fake:
 *  post:
 *   description: Este enpoint solo se usa en desarrollo para crear categorias
 *   responses:
 *      '200':
 *         description: Retorna todas las categorias creadas
 * 
 */
router.post("/fake", async (req, res) => {

    await Category.bulkCreate(
        FakeDataCtry
    ).then(category => {
        res.status(200).json(category);
    }).catch(err => {
        return res.status(500).send(err);
    })
})

module.exports = router;
