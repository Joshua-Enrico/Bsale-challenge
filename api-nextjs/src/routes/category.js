const router = require('express').Router();// manejador de rutas
const db = require('../utils/database'); // manejador de base de datos
const initModels = require('../models/init-models'); // manejador de modelos

/* instanciamos el modelo Category  */
var models = initModels(db.sequelize);
const Category = models.category;

// Obtener todos las categorias
router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = router;