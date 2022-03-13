const Computer = require("../models/Computer");
const Components = require("../models/Components");
const Perhipheals = require("../models/Perhipheals");
const controller = {};

const computer = new Computer();
const components = new Components();
const perhipheals = new Perhipheals();

controller.GetAll = async (req, res) => {
  try {
    const data = await computer.List();
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};
controller.GetOne = async (req, res) => {
  try {
    const data = await computer.FindOne(req.params.id);
    res.json(data);
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Save = async (req, res) => {
  const newComputer = req.body;

  const {
    fk_laboratory,
    serial_number,
    brand,
    network_type,
    status,
    ram_memory,
    motherboard,
    cpu,
    gpu,
    psu,
    storage,
    display,
    keyboard,
    mouse,
    sound,
  } = newComputer;

  try {
    const computerCreationResults = await computer.Create({
      fk_laboratory,
      serial_number,
      brand,
      network_type,
      status,
    });
    console.log(computerCreationResults);

    await components.Create({
      fk_computer: computerCreationResults.insertId,
      ram_memory,
      motherboard,
      cpu,
      gpu,
      psu,
      storage,
    });

    await perhipheals.Create({
      fk_computer: computerCreationResults.insertId,
      display,
      keyboard,
      mouse,
      sound,
    });

    res.json({
      status: true,
      statusText: "Elemento guardado correctamente.",
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Update = async (req, res) => {
  try {
    const results = await computer.Update(req.body, req.params.id);
    console.log(results);

    //Si no exite ninguna fila afectada, significa que ese registro no existe.
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese elemento.",
      });
    }
    res.status(200).json({
      status: true,
      statusText: "Elemento editado correctamente.",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

controller.Delete = async (req, res) => {
  try {
    const results = await computer.Delete(req.params.id);
    console.log(results);
    //Si no exite ninguna fila afectada, significa que ese registro no existe.
    if (results.affectedRows === 0) {
      return res.status(400).json({
        status: false,
        statusText: "No existe ese elemento.",
      });
    }
    res.json({
      status: true,
      statusText: "Elemento eliminado correctamente.",
      dbresponse: results,
    });
  } catch (error) {
    console.log("Error" + error);
    res.json({
      status: false,
      statusText: "Algo fue mal, contácta al area de sistemas.",
      error,
    });
  }
};

module.exports = controller;
