const { Router } = require("express");
const router = Router();
const roommatesRoute = require("./roommates.routes.js");
const expensesRoute = require("./expenses.routes.js");

//endpoints de secciones
router.use("/", roommatesRoute);
router.use("/", expensesRoute);

module.exports = router;
