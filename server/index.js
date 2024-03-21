import express from 'express';
import 'dotenv/config';
import weatherRoutes from './routes/weatherInfo.js';
import swaggerUi from "swagger-ui-express";
import fs from 'fs';

const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json').toString());

const app = express();
const PORT = 8000;

app.use(express.static('public'));
app.use('/api/weather', weatherRoutes);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})