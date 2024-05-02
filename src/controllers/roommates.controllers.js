const axios = require("axios");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

//función para crear usuario
const createRoommate = async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=1");
    const newRoommate = {
      id: uuidv4().slice(0, 5),
      nombre:
        `${response.data.results[0].name.first}` +
        " " +
        `${response.data.results[0].name.last}`,
      debe: null,
      recibe: null,
    };
    let roommates = { roommates: [] };
    try {
      const data = await fs.readFile("../data/Roommates.json", "utf8");
      if (data) {
        roommates = JSON.parse(data);
      }
    } catch (error) {
      console.error(error.message);
    }
    roommates.roommates.push(newRoommate);
    console.log(newRoommate);
    await fs.writeFile(
      ("../data/Roommates.json"),
      JSON.stringify(roommates)
    );
    res.json(newRoommate);
  } catch (error) {
    console.error(error.message);
  }
};

//función para obtener los usuarios registrados
const getRoommates = async (req, res) => {
  try {
    const allRoommates = path.join("../data/Roommates.json");
    const roommates = await fs.readFile(allRoommates, "utf8");
    const parseAllRoommates = JSON.parse(roommates);
    res.json(parseAllRoommates);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Error al encontrar los registros");
  }
};

module.exports = {
  createRoommate,
  getRoommates,
};
