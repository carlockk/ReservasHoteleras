require('dotenv').config();
const express = require('express');
const app = express();
const rutas = require('./routes/reservas.routes');
const { swaggerUi, swaggerSpec } = require('./swagger');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/reservas', rutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});
