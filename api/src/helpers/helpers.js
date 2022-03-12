const bcrypt = require("bcryptjs");
const conn = require("../database");

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.initialState = async () => {
  try {
    const adminExists = await conn.query(
      "select * from users where fk_rol = 1"
    );
    if (!adminExists.length > 0) {
      const firstAdmin = {
        username: "Administrador",
        fullname: "Administrador Principal",
        email: "admin@school.com",
        password: "12345678",
        fk_rol: 1,
      };
      firstAdmin.password = await helpers.encryptPassword(firstAdmin.password);
      await conn.query("insert into users set ?", [firstAdmin]);
      console.log("Runned initial state\nFirst admin created");
    }
  } catch (error) {
    console.log(error);
  }
};

helpers.isDuplicated = async (table, field, value) => {
  try {
    const results = await connection.query(
      `select * from ${table} where ${field} = ?`,
      [value]
    );
    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
helpers.isDuplicatedOnUpdate = async (table, field, currentId, newValue) => {
  try {
    //Aqui obtenemos la primary key de la tabla para saber el nombre de la columna
    //Ya que las primary key pueden tener nombres diferentes
    const tableKey = await connection.query(
      `SHOW KEYS FROM ${table} WHERE Key_name = 'PRIMARY'`
    );
    const results = await connection.query(
      `select * from ${table} where ${field} = ? && ${tableKey[0].Column_name} != ${currentId}`,
      [newValue]
    );

    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
module.exports = helpers;
