const express = require("express");
const app = express();
const port = 8080;
const nunjucks = require("nunjucks");
const db = require("./database/db");
const carRoutes = require("./routes/cars");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/cars", carRoutes);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", function (req, res) {
  res.render("home.njk");
});

app.get("/cars", function (req, res) {
  db.all("SELECT * FROM cars", [], (err, rows) => {
    if (err) {
      res.status(500).send("Error retrieving cars from database");
      return;
    }
    console.log("Cars retrieved from database:", rows);
    res.render("cars.njk", { cars: rows });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
