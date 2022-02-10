# Bsale Challenge


Objetivo del proyecto: Crear una tienda online completa(front y backend) con la finalidad de mostrar productos basado en busqueda y filtros.

Las Caractericas de la aplicacion: 
* Frontend simple que despliega productos por busqueda dinamicamente
* Backend(Api rest) que proporciona endpoinds necesarios para la aplicacion

## Table of Contents
* [Ejecucion](#Ejecucion)
* [File Structure](#file-structure)
* [File Structure](#Directories)
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
* [Example of Use](#example-of-use)
* [Bugs](#bugs)
* [Authors](#authors)
* [License](#license)




## Tecnologias y Librerias usadas
Frontend :
* Vanilla.js
* Html
* Css
* Jquery
* Axios

Backend:
  Desplegado en aws(ec2)
* Node.js
* Express
* Sequelize
* Cors
* Mysql2
* Dotenv

Tests:
* Mocha.js
* Supertest.js

CI/CD:
Se Implemento integracion continua a una instancia ec2 de aws para la api, y para el frontend se esta usando vercel.
vercel proporciona una integracion continua. En total se esta ejecutando CI/CD para el frontend y backend,cada uno en su propio entorno

CI/CD Backend:
Servicios aws usados
* EC2
* IAM
* Piplines
* CodeDeploy

CI/CD Frontend:
* Vercel

## Inconveniente a Mencionar
Dado  que se nos proporciono un servidor db del cual nuestra api depende, el inconveniente que
esta sucediendo es que el servidor tiene un maximo de conexiones por hora, lo que puede estar sucediendo es que otros postulantes al estar en desarrollo,
estan ejecutando su aplicacion varias veces en un lapso de pocos minutos , eso hace que lleguemos al limite de conexiones en cuestion de minutos,
estaba pensando en implementar alguna solucion ya que el inconveniente solo empeoraba y empeoraba mi flujo de desarrollo.
La solucion fue clonar la db proporcionada, con ello mitigaba dos problemas, 1. no poder conectarme a la db en largos periodos de tiempo y
2.Perjudicar a otros postulantes ya que aportaba a llegar al limite de las conexiones, pero luego en produccion lo que sucede es que no podia establecer una conexiones a la db proporcionada, obte por crear una db en el servidor de la api y asi mitigar ese problema ya que la aplicacion depende de la conexion.

esta db se estara ejecutando en la misma instancia ec2 de aws, con eso mitigamos el problema de las limitaciones de conexion por hora.
En caso de querer probar la conexion a la db proporcionada solo basta con configurar el entorno de variable `HOST` con el valor del host de la db deseada,
mas adelante dejare algunos scripts y pasos para crear una db generica con data y usuario para poder tener una db en mysql funcional.


## Ejecucion

En este caso Se esta manejando dos entornos diferentes para el front y backend:

Variables de Entorno: Debes crear un .env file en el directorio `api` que contenga lo siguiente
`PORT`: para el puerto en que se ejecutara la api

`host`: host de la db en la cual se hara la conexion

`username`: usuario de la db

`password`: del usuario de la db

`database`: nombre de la db

![image](https://user-images.githubusercontent.com/77980741/153331311-0ecd2fe4-727a-4121-ac7a-a35f4d74f625.png)




Frontend: En El front es simple y directo , No se esta manejando ningun framework para el frontend asi que no hay requisitos para ejecutar,
Unicamente debes apuntar correctamente al index.html en el entorno que estes ejecutando

```
$ ./console.py
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  help  quit

(hbnb) 
(hbnb) 
(hbnb) quit
$
```
Backend: En el caso del backedn es diferente, estamos usando el entorno de node.js(v16.13.2), su manejador de 
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
* Para produccion : Para produccion instalas las dependencias `npm install` seguido de `npm run start`
```
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# pwd
/home/bsale-challenge/api
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# 
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# npm install
...
...
...
(base) root@DESKTOP-VQ684KQ:/home/bsale-challenge/api# npm run start

> api@1.0.0 start
> node ./src/index.js

Server is running on port 3000
Executing (default): SELECT 1+1 AS result
Connection has been established successfully.

```

## Ejecutar Tests

Se adicion tests con casos de prueba simples para los endpoints:

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

## Crear DB y Data
Esta solucion la emplee por el motivo ya explicado, estoy usando scripts sh y mocha con supertest para la creacion de la db y la data.
!imporante, el script no instala mysql, el motivo por el que dedici no incluir ese paso es para evitar
algun error de compatibilidad con la version de mysql que ustedes tengan
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


## Estructura de archivos

##|Directorio o Archivo | Descripcion
---|---|---
0|[api](./api)| Directorio que contiene la logica de backend(api Rest)
1|[front](./front)| Directorio que contiene la logica de frontend
1|[scripts](./scripts)| Este directorio contiene los scripts necesarios para implementar CI/CD


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


### Structura directorio Front

##|Directorio o Archivo | Descripcion
---|---|---
0|[apicalls](./front/fakeData)| Este Directorio Contiene toda la logica de los apicalls a nuestra api
1|[galery](./front/node_modules)| Este Directorio contiene imagenes que usa nuestra app
2|[js](./api/src)| En este Directorio tenemos funciones de utilidad 
3|[pages](./api/src)| En este Directorio tenemos todas nuestas paginas html 
4|[styles](./api/src)| Este Directorio contiene todo nuestros archivos css



