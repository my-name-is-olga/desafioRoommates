const { Router } = require("express");
const router = Router();
const {
  createRoommate,
  getRoommates,
} = require("../controllers/roommates.controllers");

//devuelve roommates registrados
router.get("/roommates", getRoommates);

//ingresar un roommate al registro
router.post("/roommates", createRoommate);

module.exports = router;
