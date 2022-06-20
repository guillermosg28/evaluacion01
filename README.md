# EVALUCIÓN 01

## Requerimientos
- Desplegar nodeJS y mongoDB en un container de Docker <br/>
-ejecutar la aplicación:  `docker-compose build`<br/>
-luego lenvatamos el contenedor `docker-compose up`

## Apis

`GET: http://localhost:9595/upload_documents`<br/>
Crea y carga los datos a la BD de mongo

`GET: http://localhost:9595/alls`<br/>
Retorna todos los documentos

`GET: http://localhost:9595/search?category=ABARROTES`<br/>
Filtra los documentos por categoría

`PUT: http://localhost:9595/update?name=MALTIN&category=GASEOSAS&price=93`<br/>
Actualiza un documento, si existe actualiza los datos, si no existe se ingresa un nuevo documento

`DELETE: http://localhost:9595/delete?name=MALTIN`<br/>
Elimina un documento, si existe en la BD