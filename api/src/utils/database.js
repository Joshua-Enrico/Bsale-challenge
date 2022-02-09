/* En este modulos vamos inicializamos nuestro orm y,
   conectamos con la base de datos proporcionada */

const { Sequelize } = require('sequelize');// Importamos sequelize(ORM)
const dotenv = require('dotenv'); // Importamos dotenv para leer nuestras variables de entorno
dotenv.config();


/* Aqui inicializamos la conexión con la base de datos de MySQL usando sequelize(orm) */
const sequelize = new Sequelize(
  process.env.database,
  process.env.username,
  process.env.password, 
  {
  host: process.env.host,
  dialect: "mysql" /* selecting dialect */
});

sequelize
  .authenticate(process.env.username)
  .then(() => {
    console.log('Connection has been established successfully.'); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // eslint-disable-line no-console
  });

// sequelize.sync()  // crea e inicializa la tabla de productos en caso de necesitarlo (solo en desarrollo)

/* usaremos este objeto para exportarlo y poder usarlo,
   en otros archivos de manera ordenada*/
const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;