# Bsale Challenge


Objetivo del proyecto: Crear una tienda online completa(front y backend) con la finalidad de mostrar productos basado en busqueda y filtros.

Las Caractericas de la aplicacion: 
* Frontend simple que despliega productos por busqueda dinamicamente
* Backedn(Api rest) que proporciona endpoinds necesarios por la aplicacion

## Tecnologias y Librerias usadas
Frontend :
* Vanilla js
* Html
* Css
* Jquery
* Axios

Backend:
* Node.js
* Express
* Sequelize
* Cors
* Mysql2
* Dotenv

## Ejecucion

En este caso Se esta manejando dos entornos diferentes para el front y backend:

Fronend: En El front es simple y directo , No se esta manejando ningun framework para el fron asi que no hay requisitos para ejecutar
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
Backend: En el caso del backedn es diferente, estamos usando el entorno de node.js, su manejador de 
paquetes es estupendo asi que la instalacion de las dependencias no deberia ser un problema.

Aqui tienes dos opciones:


* Para desarrollo: Estoy proporcionando los node-modules para facilitar las cosas , en caso de que quieras instalar las dependencias desde 0, 
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


## Estructura de archivos

##|Directorio o Archivo | Descripcion
---|---|---
0|[console.py](./console.py)|command interpreter to manage your AirBnB objects: Create a new object (ex: a new User or a new Place) ; Retrieve an; object from a file, a database etc… ; Do operations on objects (count, compute stats, etc…); Update attributes of an object; Destroy an object
1|[models](./models)|directory of all the classes
2|[tests](./tests)|directory of console test and class tests

### 2.0.Test_models structure

##|File|Description
---|---|---
2.0.0|[test_engine](./tests/test_models/test_engine)|Directory where the project tests all the tests for the storage of the program
2.0.1|[__init__.py](./tests/test_models/__init__.py)|initialization code for the package: files are required to make Python treat the directories as containing packages; this is done to prevent directories with a common name
2.0.2|[test_amenity.py](./tests/test_models/test_amenity.py)|Testing Amenity class- Comproving expectect outputs and documentation
2.0.3|[test_base_model.py](./tests/test_models/test_base_model.py)|Testing BaseModel- Comproving expectect outputs and documentation
2.0.4|[test_city.py](./tests/test_models/test_city.py)|Test City Class - Comproving expectect outputs and documentation
2.0.5|[test_place.py](./tests/test_models/test_place.py)|Test place - Comproving expectect outputs and documentation
2.0.6|[test_review.py](./tests/test_models/test_review.py)|Test Review - Comproving expectect outputs and documentation
2.0.7|[test_state.py](./tests/test_models/test_state.py)|Test state - Comproving expectect outputs and documentation
2.0.8|[test_user.py](./tests/test_models/test_user.py)|Test User - Comproving expectect outputs and documentation
