const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: "3.0.0", // NO OLVIDAR: versión obligatoria para Swagger UI
  info: {
    title: "API de Reservas Hoteleras",
    version: "1.0.0",
    description: "Documentación de la API para la gestión de reservas hoteleras"
  },
  servers: [
    {
      url: "https://reservashoteleras.onrender.com/api", // URL pública
      description: "Servidor Render"
    },
    {
      url: "http://localhost:3000/api", // Para entorno local
      description: "Servidor Local"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Aquí Swagger busca las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
