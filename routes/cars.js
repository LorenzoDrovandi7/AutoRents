const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

router.get("/:id", (req, res) => {
  const carId = req.params.id;

  db.get("SELECT * FROM cars WHERE id = ?", [carId], (err, car) => {
    if (err) {
      return res.status(500).send("Error al buscar el auto.");
    }

    if (!car) {
      return res.status(404).send("Auto no encontrado.");
    }

    res.render("car.njk", { car });
  });
});

router.get("/edit/:id", (req, res) => {
  const carId = req.params.id;

  db.get("SELECT * FROM cars WHERE id = ?", [carId], (err, car) => {
    if (err) {
      return res.status(500).send("Error al buscar el auto.");
    }

    if (!car) {
      return res.status(404).send("Auto no encontrado.");
    }

    res.render("edit.njk", { car });
  });
});

router.post("/edit/:id", upload.single("image"), (req, res) => {
  const carId = req.params.id;
  const { brand, model, year, color, km, air_conditioning, transmission, passengers } = req.body;

  const newImage = req.file ? req.file.filename : req.body.currentImage;

  db.run(
    `UPDATE cars SET brand = ?, model = ?, year = ?, color = ?, km = ?, air_conditioning = ?, transmission = ?, passengers = ?, image = ? WHERE id = ?`,
    [brand, model, year, color, km, air_conditioning ? 1 : 0, transmission, passengers, newImage, carId],
    (err) => {
      if (err) return res.status(500).send("Error al actualizar el auto.");
      res.redirect(`/cars/${carId}`);
    }
  );
});

module.exports = router;
