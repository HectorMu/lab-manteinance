const Users = require("../models/Users");
const helpers = require("../helpers/helpers");
const controller = {};

controller.GetAll = async (req, res) => {
  try {
    const data = await Users.List();
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
    const data = await Users.FindOne(req.params.id);
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
  const newUser = req.body;
  try {
    const emailExists = await helpers.isDuplicated(
      "users",
      "email",
      newUser.email
    );
    if (emailExists) {
      return res.json({
        status: false,
        statusText: "This email is already in use.",
      });
    }

    newUser.password = await helpers.encryptPassword(newUser.password);
    const results = await Users.Create(newUser);
    console.log(results);
    res.json({
      status: true,
      statusText: "Usuario creado correctamente.",
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
  const modifiedUser = req.body;
  const { id } = req.params;
  try {
    if (modifiedUser.password) {
      modifiedUser.password = await helpers.encryptPassword(modifiedUser.password);
    }

    const emailExists = await helpers.isDuplicatedOnUpdate(
      "users",
      "email",
      id,
      modifiedUser.email
    );
    if (emailExists) {
      return res.json({
        status: false,
        statusText: "This email is already in use.",
      });
    }
    const results = await Users.Update(modifiedUser, id);
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
      statusText: "Usuario editado correctamente.",
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
    const results = await Users.Delete(req.params.id);
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
