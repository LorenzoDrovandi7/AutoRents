const express = require("express");
const app = express();
const port = 8080;
const nunjucks = require("nunjucks");
const db = require("./database/db");
const carRoutes = require("./routes/cars");
const clientsRoutes = require("./routes/clients");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/cars", carRoutes);
app.use("/clients", clientsRoutes);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", function (req, res) {
  res.render("home.njk");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
