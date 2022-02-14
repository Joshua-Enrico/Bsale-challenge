# Bsale Challenge


Objetivo del proyecto: Crear una tienda online completa(front y backend) con la finalidad de mostrar productos basado en busqueda y filtros.


Las Caractericas de la aplicacion: 
* Backend(Api rest) que proporciona endpoinds necesarios para la aplicacion Ecommerce

[Link del Demo](http://front-ecommerce-test.s3-website-us-east-1.amazonaws.com/)

[URL de Api](http://54.211.177.150)

## Tabla de Contenidos
* [Tecnologias-Librerias-usadas](#Tecnologias-Librerias-usadas)
* [Inconveniente a Mencionar](#Inconvenientes)
* [Deploy](#Deploy)
* [Tests](#Tests)
* [Crear DB y Data](#DB-DATA)
* [Estructura de Archivos](#Estructura)




## Tecnologias-Librerias-usadas

Backend:
  Desplegado en aws(ec2)
* [Node.js](https://nodejs.org/es/)
* [Express](https://expressjs.com/es/)
* [Sequelize](https://sequelize.org/v7/)
* [Cors](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
* [Mysql2](https://www.npmjs.com/package/mysql2)
* [Dotenv](https://www.npmjs.com/package/dotenv)

Tests:
* [Mocha](https://mochajs.org/)
* [SuperTest](https://www.npmjs.com/package/supertest)

CI/CD:
Se Implemento integracion continua a una instancia ec2 de aws para la api, y para el frontend se esta usando S3 de aws.
En total se esta ejecutando CI/CD para el frontend y backend,cada uno en su propio entorno

CI/CD Backend:
Servicios aws usados
* [EC2](https://docs.aws.amazon.com/es_es/AWSEC2/latest/UserGuide/concepts.html)
* [IAM](https://aws.amazon.com/es/iam/)
* [Pipeline](https://aws.amazon.com/es/codepipeline/)
* [CodeDeploy](https://aws.amazon.com/es/codedeploy/)

Documentacion de API con swagger:
* [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
* [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)

[Link Swagger](http://54.211.177.150/api-docs/)


## Inconvenientes
### Inconveniente a Mencionar
Dado  que se nos proporciono un servidor db del cual nuestra api depende, el inconveniente que
esta sucediendo es que el servidor tiene un maximo de conexiones por hora, lo que puede estar sucediendo es que otros postulantes al estar en desarrollo,
estan ejecutando su aplicacion varias veces en un lapso de pocos minutos , eso hace que lleguemos al limite de conexiones en cuestion de minutos,
estaba pensando en implementar alguna solucion ya que el inconveniente solo empeoraba y empeoraba mi flujo de desarrollo.
La solucion fue clonar la db proporcionada, con ello mitigaba dos problemas, 1. no poder conectarme a la db en largos periodos de tiempo y
2.Perjudicar a otros postulantes ya que aportaba a llegar al limite de las conexiones, pero luego en produccion lo que sucede es que no podia establecer una conexiones a la db proporcionada porque aun seguia alcanzando el limite de conexiones, obte por crear una db en el servidor de la api y asi mitigar ese problema ya que la aplicacion depende de la conexion.

esta db se estara ejecutando en la misma instancia ec2 de aws, con eso mitigamos el problema de las limitaciones de conexion por hora.
En caso de querer probar la conexion a la db proporcionada solo basta con configurar el entorno de variable `HOST` con el valor del host de la db deseada,
mas adelante dejare algunos scripts y pasos para crear una db generica con data y usuario para poder tener una db en mysql funcional.


## Deploy

El deploy usando entorno node.js es bastante intuitivo, les estoy dejando algunos scripts , solo tiene que ejecutarlo en el directorio que se le indiciara a continuacion.
Al ejecutar el script se instalara las dependencias necesarias para ejecutar la aplicacion:

!importante: En caso de no tener node.js y npm tendra que instalarlo para que la aplicacion pueda funcionar correctamente , la distro de linux que uso es  ubuntu 20,
El comando para instalar node.js es el siguiente `sudo apt install nodejs` basta que la versiones sea igual o mayor a 
node.js(v16.13.2), lo usual es que node.js venga con su version de npm, en cas de tener problemas con la instalacion verificar una guia especifica para la version de su distro.
Me hubiera gustado entregar un script que installe todo en una imagen de docker pero hubiear sido tambien un tema si no tenian docker instalado.


Variables de Entorno: Debes crear un .env file en el directorio `api` que contenga lo siguiente
`PORT`: para el puerto en que se ejecutara la api

`host`: host de la db en la cual se hara la conexion

`username`: usuario de la db

`password`: del usuario de la db

`database`: nombre de la db

La razon por la que no integro las credenciales en el codigo es por tema de seguridad y buenas practicas, puede que complique el deployment, pero es un paso necesario.

![image](https://user-images.githubusercontent.com/77980741/153331311-0ecd2fe4-727a-4121-ac7a-a35f4d74f625.png)



Backend: Estamos usando el entorno de node.js(v16.13.2), su manejador de 
paquetes es estupendo asi que la instalacion de las dependencias no deberia ser un problema.

Aqui tienes dos opciones:


* Para desarrollo: Instalar las dependencias, 
ejecuta `npm install` y por ultimo `npm run dev`

```
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# pwd
/home/bsale-challenge/api
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# 
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# npm install
...
...
...
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# npm run dev

> api@1.0.0 dev
> nodemon ./src/index.js

[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./src/index.js`
Server is running on port 3000
Executing (default): SELECT 1+1 AS result
```
* Para produccion : Para produccion ejecutar el script en el root del repositorio `./deployment.sh`
```
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge# ./deployment.sh 

up to date, audited 296 packages in 1s

41 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

> api@1.0.0 start
> node ./src/index.js

Server is running on port 3000
Connection has been established successfully.

```


## Tests
### Ejecutar Tests

Se adiciono tests con casos de prueba simples para los endpoints:

* Para ejecutar los tests primero asegurarce de tener instalado mocha y supertest, basta con tener ejecutado `npm install` 
ya que las librerias estan en las dependencias, una vez verificado debes estar en el directorio `api` y ejecutar `npm run testApi`
puedes verificar el commando en `package.json`, ejemplo:
```
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# npm run testApi

> api@1.0.0 testApi
> mocha tests/ --exit

Server is running on port 3000


Connection has been established successfully.
  ✔ testing get method /api/category/ endpoint (63ms)
  ✔ testing get method /api/products/ endpoint
  ✔ testing get method /api/products/:productId endpoint
  ✔ testing get method /api/products/qty/:number endpoint
  ✔ testing get method /api/products/qty/ endpoint manejo de errores
  ✔ testing get method /api/products/search/paginate/:search endpoint
  ✔ testing get method /api/products/search/paginate/:search endpoint
returned
  ✔ testing get method /api/products/search/paginate/:search endpoint manejo de errores
returned
  ✔ testing get method /api/products/search/paginate/:search endpoint manejo de errores

  9 passing (197ms)

```

## DB-DATA
### Crear DB y Data
Esta solucion la emplee por el motivo ya explicado, estoy usando scripts sh y mocha con supertest para la creacion de la db y la data.
!imporante, el script no instala mysql, el motivo por el que dedici no incluir ese paso es para evitar
algun error de compatibilidad con la version de mysql que ustedes tengan,
el script crea un db con usuario y ejecuta unos endpoints especiales para crear la data,
ejecutar el comando `npm run CreateDB`, ejemplo:

Esta integracion no esta incluida en el CI/CD, pero los scripts si estaran el el repositorio, solo basta
con ejecutar el comando en su servidor para crear la db.
```
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# sudo npm run CreateDB

> api@1.0.0 CreateDB
> sh ./scripts/CreateDb.sh

Creando Tablas...
Server is running on port 3000


Connection has been established successfully.
  ✔ Creando tabla de categorias con data (118ms)
  ✔ Creando tabla de productos con data endpoint (57ms)

  2 passing (206ms)

```


## Estructura
### Esctuctura de Achivos

##|Directorio o Archivo | Descripcion
---|---|---
0|[api](./api)| Directorio que contiene la logica de backend(api Rest)
1|[front](./front)| Directorio que contiene la logica de frontend
2|[scripts](./scripts)| Este directorio contiene los scripts necesarios para implementar CI/CD
3|[appspec.yml](./appspec.yml)| script para el CI/CD de la api
4|[.github](./.github)| Script para CI/CD del front.



### Structura directorio API

##|Directorio o Archivo | Descripcion
---|---|---
0|[fakeData](./api/fakeData)| Contiene Data de Backup y funciones para crear data
1|[node_modules](./api/node_modules)| Contiene todos las dependencias , en caso de necesitarla
2|[src](./api/src)| Directorio que contiene la logica de nuestra api
3|[tests](./api/tests)| Directorio que contiene endpoints tests
3|[scripts](./api/scripts)| Este directorio contiene scripts para crear una db y data

### Structura directorio SRC

##|Directorio o Archivo | Descripcion
---|---|---
0|[models](./api/src/models)| Este directorio Contiene los modelos de nuestra db
1|[routes](./api/src/routes)| Este directorio Contiene todos los endpoints de nuestra aplicacion
2|[utils](./api/src/utils)| Este directorio Contiene funciones de utilidad 





