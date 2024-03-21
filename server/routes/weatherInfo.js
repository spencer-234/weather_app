import express from 'express';
import { getCurrentWeather, getForecast } from '../controllers/getWeather.js';

const router = express.Router();

router.get('/current/:zip', getCurrentWeather);
router.get('/forecast/:zip', getForecast)

export default router;