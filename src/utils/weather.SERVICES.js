const axios = require("axios");

exports.doFetchWeather = function (info, cb) {
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${info}&days=5&aqi=no&alerts=no`;
  axios
    .get(url)
    .then((res) => {
      cb(res.data, undefined);
    })
    .catch((err) => {
      cb(undefined, err.response);
    });
};
