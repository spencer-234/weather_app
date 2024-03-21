import axios from "axios";

export const getCurrentWeather = async (req, res) => {
  await axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${req.params.zip}&aqi=no`
    )
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => res.status(500).json(err));
};

export const getForecast = async (req, res) => {
  await axios
    .get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${req.params.zip}&days=3&aqi=no&alerts=no`
    )
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((err) => res.status(500).json(err));
}