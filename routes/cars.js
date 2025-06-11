const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const controller = require("../controllers/carsController");

router.get("/", controller.getAllCars);
router.get("/add", controller.getAddCar);
router.get("/:id", controller.getCarById);
router.get("/edit/:id", controller.getEditCar);
router.post("/edit/:id", upload.single("image"), controller.postEditCar);
router.delete("/:id", controller.deleteCar);
router.post("/add", upload.single("image"), controller.postAddCar);

module.exports = router;
