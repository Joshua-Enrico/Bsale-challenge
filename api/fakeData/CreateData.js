/* En este modulos vamos inicializamos nuestro orm y,
   conectamos con la base de datos proporcionada */

const { Sequelize } = require('sequelize');// Importamos sequelize(ORM)
const dotenv = require('dotenv'); // Importamos dotenv para leer nuestras variables de entorno
const initModels = require('../src/models/init-models');
const { FakeDataCtry, FakeData } = require('./fakeData');// Data a crear en la db


dotenv.config();

/* Aqui inicializamos la conexión con la base de datos de MySQL usando sequelize(orm) */
console.log(process.env.database);
const sequelize = new Sequelize(
    process.env.database,
    process.env.username,
    process.env.password,
    {
        host: process.env.host,
        dialect: "mysql", /* selecting dialect */
        logging: false
    });

sequelize
    .authenticate(process.env.username)
    .then(() => {
        console.log('Connection has been established successfully.'); // eslint-disable-line no-console
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err); // eslint-disable-line no-console
    });

sequelize.sync()  // crea e inicializa la tabla de productos en caso de necesitarlo (solo en desarrollo)

var models = initModels(sequelize);// Modelos
const {Category, Products} = models.category;

// Crear Data
async function CreateData(){
    try {
        console.log("Creando data...");
        const category = await Category.bulkCreate(
            FakeDataCtry
        );
        const product = await Products.bulkCreate(
            FakeData
        );
        console.log(category);
        console.log(product);
    } catch(err) {
        console.log(err);
    }

}
CreateData().then(() => {
    console.log("Data creada");
    sequelize.close();
}).catch(err => {
    console.log(err);
    sequelize.close();
})

console.log("Data Creada");