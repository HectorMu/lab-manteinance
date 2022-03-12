const Maintenance = require("../models/Maintenance");
const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const data = await Maintenance.List();
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
    const data = await Maintenance.FindOne(req.params.id);
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
  try {
    const results = await Maintenance.Create(req.body);
    console.log(results);
    res.json({
      status: true,
      statusText: "Mantenimiento guardado correctamente.",
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

controller.Update = async (req, res) => {
  try {
    const results = await Maintenance.Update(req.body, req.params.id);
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
      statusText: "Mantenimiento editado correctamente.",
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
    const results = await Maintenance.Delete(req.params.id);
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
      statusText: "Mantenimiento eliminado correctamente.",
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
