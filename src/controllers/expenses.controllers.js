const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

//función para guardar gastos en json
const postExpenses = async (roommate, descripcion, monto) => {
  try {
    const gasto = {
      id: uuidv4().slice(0, 5),
      roommate,
      descripcion,
      monto,
    };
    const file = fs.readFile("../data/Gastos.json", "utf8");
    const data = await JSON.parse(file);
    const dataExpenses = data.gastos;
    dataExpenses.unshift(gasto);
    fs.writeFile("../data/Gastos.json", JSON.stringify(data));
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      devMessage: "CREACIÓN DE REGISTRO FALLIDO",
    };
  }
};

//función para obtener gastos
const getExpenses = async (req, res) => {
  try {
    const file = fs.readFile("../data/Gastos.json", "utf8");
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      devMessage: "OBTENCIÓN DE REGISTRO FALLIDO",
    };
  }
};

//función para modificar gastos
const updateExpenses = async (id, roommate, descripcion, monto) => {
  try {
  const file = fs.readFile("../data/Gastos.json", "utf8");
  const data = JSON.parse(file);
  let { gastos } = data;
  gastos = gastos.map((gasto) => {
    if (gasto.id === id) {
      (gasto.roommate = roommate),
        (gasto.descripcion = descripcion),
        (gasto.monto = monto);
      return gasto;
    }
    return gasto;
  });
  fs.writeFile("../data/Gastos.json", JSON.stringify({ gastos }));
} catch (error) {
  return {
    message: error.message,
    code: error.code,
    detail: error.detail,
    constraint: error.constraint,
    devMessage: "EDICIÓN DE REGISTRO FALLIDO",
  };
}
};

//función para eliminar gastos
const deleteExpenses = async (id) => {
  try {
    const file = fs.readFile("../data/Gastos.json", "utf8");
    const data = JSOn.parse(file);
    let { gastos } = data;
    const expensesFindIndex = gastos.findIndex((gasto) => gasto.id === id);
    if (expensesFindIndex !== -1) {
      gastos.splice(expensesFindIndex, 1);
      fs.writeFile("..data/Gastos.json", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      devMessage: "ELIMINACIÓN DE REGISTRO FALLIDO",
    };
  }
};

//función para calcular todos los gastos
const calculateAllExpenses = async (req, res) => {
  try {
    const roommatesData = fs.readFileSync("../data/Gastos.json", "utf8");
    const expensesData = fs.readFileSync("../data/Gastos.json", "utf8");

    const { roommates } = JSON.parse(roommatesData);
    const { expenses } = JSON.parse(expensesData);

    roommates.forEach((roommate) => {
      roommate.debe = 0;
      roommate.recibe = 0;
      roommate.total = 0;
    });
    expenses.forEach((gasto) => {
      const amountPerPerson = gasto.monto / roommates.length;
      roommates.forEach((roommate) => {
        if (gasto.roommate === roommate.nombre) {
          roommate.recibe += amountPerPerson * (roommates.length - 1);
        } else {
          roommate.debe -= amountPerPerson;
        }
        roommate.total = roommate.recibe - roommate.debe;
      });
    });
    fs.writeFileSync("../data/Roommates.json", JSON.stringify({ roommates }));
  } catch (error) {
    return {
      message: error.message,
      code: error.code,
      detail: error.detail,
      constraint: error.constraint,
      devMessage: "OBTENCIÓN DE REGISTRO FALLIDO",
    };
  }
};

module.exports = {
  getExpenses,
  postExpenses,
  updateExpenses,
  deleteExpenses,
  calculateAllExpenses,
};
