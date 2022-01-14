const axios = require("axios");

exports.doFetchWeather = function (info, cb) {
  // const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${info}&days=5&aqi=no&alerts=no`;
  const url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=${process.env.API_KEY}&q=${info}&num_of_days=14&format=json`;
  axios
    .get(url)
    .then((res) => {
      cb(res.data, undefined);
    })
    .catch((err) => {
      cb(undefined, err.response);
    });
};
