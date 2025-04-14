# API de Reservas Hoteleras

Este proyecto es una API hecha con **Node.js** y **Express** sirve para gestionar reservas hoteleras. Incluye operaciones CRUD, filtros, ID numéricos y Swagger.

---

## Estructura del proyecto

```
reservas-hotel/
├── .env
├── .gitignore
├── package.json
├── README.md
└── src/
    ├── index.js
    ├── swagger.js
    ├── data/reservas.json
    ├── controllers/
    │   └── reservas.controller.js
    └── routes/
        └── reservas.routes.js
```

---

## Hice una versión para escritorio servidor local

```abri terminal e instalé las dependencias
npm install
npm start
```

voy al navegador en:
```
http://localhost:3000/api-docs

para ver todas las reservas: 
http://localhost:3000/api/reservas

Se utilizó postman para las variables de entorno, es muy simple de utilizar
```

---

## También hice una versión para render por si desean revisar ahí
```
Disponible en:
https://reservashoteleras.onrender.com/api-docs/

para ver todas las reservas en:

https://reservashoteleras.onrender.com/api/reservas

Como estoy usando una cuenta gratuita, el servicio se va a pausar automáticamente si no recibe tráfico por unos minutos.

La siguiente vez que alguien acceda, se demora unos segundos en activarse.

En el archivo src/controllers/reservas.controller.js probé una nueva forma aprendida de hacer if, al principio me costo pero despues la comprendi perfecto.. es la amigable react por llamarle de alguna forma.

```

## Algunos filtros por query disponibles

- `?hotel=Hotel Paraíso`
- `?fecha_inicio=2023-12-01&fecha_fin=2023-12-10`
- `?tipo_habitacion=Suite`
- `?estado=confirmada`
- `?num_huespedes=3`

Es recomendable usar texto real, con tildes y mayúsculas, de todas formas puse .toLowerCase() en la versión para render 
Evitar usar todo en minúscula o sin acentos porque sino no hay resultados de búsqueda.

---

## Operaciones CRUD implementadas

- `POST /api/reservas` – Crear reserva
- `GET /api/reservas` – Ver todas
- `GET /api/reservas/:id` – Ver por ID
- `PUT /api/reservas/:id` – Editar o Actualizar
- `DELETE /api/reservas/:id` – Eliminar

---

## Documentación técnica

- Swagger disponible en `/api-docs`
- checklistDeCumplimientoDeTareas.pdf (pequeño checklist de cumplimiento)
- instalacionesyUtilitarios.pdf

---

## Tecnologías utilizadas

- Node.js
- Express
- Swagger (OpenAPI 3)
- Postman
- JSON (como base de datos)

---

Fue de gran ayuda el mega lab de la última clase, sin esa no hubiera entendido nada....
