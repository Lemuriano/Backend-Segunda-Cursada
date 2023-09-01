# Proyecto Final Backend Coderhouse (Segunda entrega)
El proyecto consiste en un servidor APIrestful, esta entrega contiene segun lo pedido

## Endpoints


**Endpoints de recursos**

"_api/products_"

GET: Obtiene lista de productos, permite tambien la obtencion de un producto por id mediante params
POST: Agrega un producto a la base de datos
PUT: Modificar un producto 
DELETE: Eliminar un producto de la base de datos

"_api/carts_"

GET: Obtiene la lista de todos los carritos como asi tambien por su id
POST: Agrega un producto a la base de datos con la cantidad de ejemplares
PUT: Modifica la cantidad de ejemplares de un producto de un carrito
DELETE: Eliminar carrito por su id

**Endpoints de vistas mediante handlebars**

"_/productos_"

"_/productos/pid_"

 "_/carts/_"


El sistema implementa el uso de controladores para cada endpoint conjuntamente con clases para manipular los recursos de la base de dato de mongo.
