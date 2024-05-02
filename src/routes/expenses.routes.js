const { Router } = require("express");
const router = Router();
const {
  getExpenses,
  postExpenses,
  updateExpenses,
  deleteExpenses,
  calculateAllExpenses,
} = require("../controllers/expenses.controllers.js");

//devuelve gastos
router.get("/gastos", getExpenses);

//ingresa gastos registrados
router.post("/gastos", postExpenses);

//edita un gasto registrado
router.put("/gastos", updateExpenses);

//elimina un gasto del regustro
router.delete("/gastos", deleteExpenses);

//calcula todos los gastos
router.get("/gastos/calculo", calculateAllExpenses);

module.exports = router;
