const router = require("express").Router();
const prefix = `/getweather`;
const __weatherServices = require("../utils/weather.SERVICES");

router.post(`${prefix}/search`, async (req, res) => {
  __weatherServices.doFetchWeather(req.body.place, (data, err) => {
    if (err) {
      res.status(400).send(err.data);
      return;
    }
    if (!data) {
      res
        .status(400)
        .send(
          "Something Went Wrong!\nPlease Try Again Later\nTry:\n1. Check if the enter location is valid\n2. Check your internet Connection"
        );
      return;
    }

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
