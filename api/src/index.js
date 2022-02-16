/* Este es el modulo iniciamos express */
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/* Importamos los endpoints que requerimos */
const CategoryRoute = require("./routes/category");
const ProductRoute = require("./routes/products");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API REST de Tienda Virtual",
      description: "Descripción de la API REST de Tienda Virtual",
      contact: {
        name: "Secret",
      },
      servers: ["http://54.211.177.150"],
    },
  },
  apis: ["./src/routes/*.js"],
};

const SwaggerDocs = swaggerJsDoc(swaggerOptions);

/* inicializamos express y declaramos los enpoints que usaremos */
const api = express();
var cors = require("cors");
api.use(cors());
api.use(express.json());
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(SwaggerDocs));
api.use("/api/category", CategoryRoute);
api.use("/api/products", ProductRoute);
/* end  */

/* declaramos el puerto proporcionado o usamos uno por default */
api.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port " + process.env.PORT);
});

module.exports = api;
