const SupportTicket = require("../models/SupportTicket");
const Computer = require("../models/Computer");

const supportticket = new SupportTicket();
const computer = new Computer();

const controller = {};
controller.GetAll = async (req, res) => {
  try {
    const data = await supportticket.List();
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
    const data = await supportticket.FindOne(req.params.id);
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
  const newTicket = {
    ...req.body,
    fk_user: req.user.id,
    status: "Open",
  };

  try {
    const results = await supportticket.Create(newTicket);
    await computer.Update({ status: "Not working" }, newTicket.fk_computer);
    console.log(results);
    res.json({
      status: true,
      statusText: "Elemento guardado correctamente.",
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
    const results = await supportticket.Update(req.body, req.params.id);
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
    const results = await supportticket.Delete(req.params.id);
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
