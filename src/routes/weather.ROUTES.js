const router = require("express").Router();

// url prefix
const prefix = `/getweather`;

router.get(`${prefix}/search`, (req, res) => {
  res.status(200).send("hallo");
});

module.exports = router;
