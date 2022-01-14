const router = require("express").Router();
const prefix = `/getweather`;
const __weatherServices = require("../utils/weather.SERVICES");

router.post(`${prefix}/search`, async (req, res) => {
  __weatherServices.doFetchWeather(req.body.place, (data, err) => {
    if (err) {
      res.status(400).send(err.data);
      return;
    }

    // const weatherData = {
    //   location: data.location,
    //   current: data.current,
    //   forecast: data.forecast,
    // };
    const weatherData = {
      location: data.data.request,
      current: data.data.current_condition,
      forecast: data.data.weather,
    };
    weatherData.forecast.forEach((ele) => {
      delete ele.hourly;
      delete ele.astronomy;
    });
    res.status(200).send(weatherData);
  });
});

module.exports = router;
