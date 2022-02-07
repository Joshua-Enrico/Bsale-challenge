// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../../src/utils/database'); // manejador de base de datos
const initModels = require('../../../src/models/init-models'); // manejador de modelos

/* instanciamos el modelo Category  */
var models = initModels(db.sequelize);
const Category = models.category;


export default async function handler(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).send(err);
    }
  }
