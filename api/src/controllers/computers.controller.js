const Computer = require("../models/Computer");
const Components = require("../models/Components");
const Perhipheals = require("../models/Perhipheals");
const Maintenance = require("../models/Maintenance");
const controller = {};

const computer = new Computer();
const components = new Components();
const perhipheals = new Perhipheals();
const maintenance = new Maintenance();

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
    const generalData = await computer.FindOne(req.params.id);
    const computerComponents = await components.FindOne(req.params.id);
    const computerPerhipheals = await perhipheals.FindOne(req.params.id);
    delete computerComponents.fk_computer;
    delete computerPerhipheals.fk_computer;
    const data = {
      ...generalData,
      ...computerComponents,
      ...computerPerhipheals,
    };
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
      insertedId: computerCreationResults.insertId,
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
    const results = await computer.Update(
      { fk_laboratory, serial_number, brand, network_type, status },
      req.params.id
    );

    await components.Update(
      {
        fk_computer: req.params.id,
        ram_memory,
        motherboard,
        cpu,
        gpu,
        psu,
        storage,
      },
      req.params.id
    );

    await perhipheals.Update(
      {
        fk_computer: req.params.id,
        display,
        keyboard,
        mouse,
        sound,
      },
      req.params.id
    );
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
    await components.Delete(req.params.id);
    await perhipheals.Delete(req.params.id);
    await maintenance.Delete(req.params.id);
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
