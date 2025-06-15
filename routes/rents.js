const express = require("express");
const router = express.Router();
const controller = require("../controllers/rentsController");

router.get("/", controller.getAllRents);
router.get("/add", controller.getAddRent);
router.post("/add", controller.postAddRent);
router.get("/:id", controller.getRentById);
router.get("/:id/edit", controller.getEditRent);
router.post("/:id/edit", controller.postEditRent);
router.delete("/:id", controller.deleteRent);

module.exports = router;
