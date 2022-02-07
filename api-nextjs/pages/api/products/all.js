const db = require('../../../src/utils/database'); // manejador de base de datos
const initModels = require('../../../src/models/init-models'); // manejador de modelos

/* instanciamos el modelo Category  */
var models = initModels(db.sequelize);
const Products = models.product;


export default async function handler(req, res) {
    try {
      const products = await Products.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).send(err);
    }
  }
