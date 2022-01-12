const router = require("express").Router();
const prefix = `/getweather`;
const __weatherServices = require("../utils/weather.SERVICES");

router.get(`${prefix}/search`, (req, res) => {
  __weatherServices.doFetchWeather(req.body.place, (data, err) => {
    if (err) {
      res.status(400).send(err);
      return;
    }

    const weatherData = {
      location: data.location,
      current: data.current,
      forecast: data.forecast,
    };
    res.status(200).send(weatherData);
  });
});

module.exports = router;
