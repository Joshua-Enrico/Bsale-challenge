const router = require('express').Router();// manejador de rutas
const db = require('../utils/database'); // manejador de base de datos
const initModels = require('../models/init-models'); // manejador de modelos
const Op = db.Sequelize.Op;

/* instanciamos el modelo Products  */
var models = initModels(db.sequelize);
const Products = models.product;

// Obtener todos los productos
router.get("/", async (req, res) => {
    try{
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).send(err);
    }
})

// obtener un producto por id
router.get("/:productId", async (req, res) => {
    const id = req.params.productId;
    if (!id) {
        res.status(400).send("El id es requerido");
    }
    try{
        const prodcut = await Products.findByPk(id);
        return res.status(200).json(prodcut);
    }catch(err) {
        return res.status(500).send(err);
    }
})

// buscar productos por ocurrencia de 
router.get("/search/:search", async (req, res) => {
    try {
        const search = req.params.search;
        const products = await Products.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                ]
            }
        });
        return res.status(200).json(products);
    }catch{

    }
})

module.exports = router;