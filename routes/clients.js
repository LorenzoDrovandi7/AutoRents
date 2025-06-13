const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientsController");

router.get("/", controller.getAllClients);
router.get("/add", controller.getAddClient);
router.post("/add", controller.postAddClient);
router.get("/:id", controller.getClientById);
router.delete("/:id", controller.deleteClient);

module.exports = router;
