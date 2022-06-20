# EVALUCIÓN 01

## Requerimientos
- Desplegar nodeJS y mongoDB en un container de Docker <br/>
-ejecutar la aplicación:  `docker-compose build`<br/>
-luego lenvatamos el contenedor `docker-compose up`

## Apis

`GET: /upload_documents`<br/>
Crea y carga los datos a la BD de mongo

`GET: /alls`

`GET: /search?category=ABARROTES`

`UPDATE: /update?name=MALTIN&category=GASEOSAS&price=93`

`DELETE: /delete?name=MALTIN`