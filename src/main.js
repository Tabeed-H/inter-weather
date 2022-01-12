const express = require("express");
const path = require("path");
const hbs = require("hbs");
const weatherRoutes = require("./routes/weather.ROUTES");

// setting up express
const app = express();

// setting up server
const PORT = process.env.PORT;

// for json parsing
app.use(express.json());

// setting up public folder
const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

// setting up views
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views/templates"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// weather routes
app.use(weatherRoutes);

// base url
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error Starting Server!`);
    return;
  }

  console.log(`Server Running at Port ${PORT}`);
});
