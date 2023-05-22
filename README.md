# pushingit_final
Entrega Final curso Pushing It - Cypress y Javacript

## Requisitos
- Deberan utilizar el mismo proyecto que utilizaron para la pre-entrega.
- Deberá contar con una baseURL
- Deberá poder iniciarse colocando "npm test"
- Deberán utilizar fixtures (2)
- Deberán utilizar hooks (Before y after)
- Deberán utilizar una clase diferente para cada pagina que utilicen
- Deberán entregarlo en un repositorio de github.
- El login y el registro debe ser utilizando endpoints (cy.request)
- Deberán eliminar el usuario creado una vez finalizado el test

## Tests
- Crear el usuario e ingresar al sistema mediante requests
- Visitar la pagina de pushing IT.
- Dirigirse al modulo "Online Shop".
- Elegir 2 productos a elección y añadirlos al carrito.
- Verificar el nombre y precio de los dos productos.
- Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos.
- Completar el checkout con sus nombres apellido y una tarjeta de credito de 16 digitos
- Verificar los siguientes datos en el ticket de compra (Nombre y apellido, productos,
tarjeta de crédito, costo total)

## Info importante
- Todo deberá ser realizado en un único archivo en una única instancia de test (un único it)
- En un archivo fixture deberán colocar el producto que quieren elegir con su precio y su
nombre para luego utilizarlo para comprobar nombre y precio en el carrito de compras
- En total serán 2 fixtures.
1. fixture para los productos a elegir (nombre y precio).
2. fixture para el checkout (nombre, apellido, tarjeta de credito)
- En total deberán usar 5 páginas (Home, products, shoppingCart, checkOut, recipt)
- Para poder guardar los datos del login en el sistema deberan utilizar el metodo
"window.localStorage.setItem()". En el deberan guardar tanto el "token" como el "user".
ambos deben obtenerlos de la peticion al hacer el login.

## Estructuración
- Describe
- Before
- It
- After
