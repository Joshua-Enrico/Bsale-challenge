/* Este es el modulo iniciamos express */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

/* Este es el modulo iniciamos express */
const CategoryRoute = require('./src/routes/category');
const ProductRoute = require('./src/routes/products');


/* inicializamos express y declaramos los enpoints que usaremos */
const api = express();
api.use(express.json());
api.use("/api/category", CategoryRoute);
api.use("/api/products", ProductRoute);
/* end  */

/* declaramos el puerto proporcionado o usamos uno por default */
api.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port ' + process.env.PORT);
});

