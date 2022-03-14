const helpers = require("../helpers/helpers");
const controller = {};

const User = require("../models/User");
const user = new User();

controller.GetAll = async (req, res) => {
  try {
    const data = await user.List();
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
    const data = await user.FindOne(req.params.id);
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

  if (newUser.password.length < 8) {
    return res.json({
      status: false,
      statusText: "The password must be 8 char long",
    });
  }

  if (newUser.confirm !== newUser.password) {
    return res.json({
      status: false,
      statusText: "The passwords don't match",
    });
  }
  delete newUser.confirm;
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
    const results = await user.Create(newUser);
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
      if (modifiedUser.password !== modifiedUser.confirm) {
        return res.json({
          status: false,
          statusText: "The passwords don't match.",
        });
      }
      delete modifiedUser.confirm;
      if (modifiedUser.password.length < 8) {
        return res.json({
          status: false,
          statusText: "The password must be 8 char long",
        });
      }
      modifiedUser.password = await helpers.encryptPassword(
        modifiedUser.password
      );
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
    const results = await user.Update(modifiedUser, id);
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
    const results = await user.Delete(req.params.id);
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
