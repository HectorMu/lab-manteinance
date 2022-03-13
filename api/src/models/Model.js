const connection = require("../database");
class Model {
  constructor(table, table_pk) {
    this.table = table;
    this.table_pk = table_pk;
    this.connection = connection;
  }
  async List() {
    const data = await connection.query(`select * from ${this.table}`);
    return data;
  }
  async FindOne(id) {
    const data = await connection.query(
      `select * from ${this.table} where ${this.table_pk} = ?`,
      [id]
    );
    if (!data.length > 0) {
      return {};
    }
    return data[0];
  }
  async Create(data) {
    const results = await connection.query(`insert into ${this.table} set ?`, [
      data,
    ]);
    return results;
  }
  async Update(data, id) {
    const results = await connection.query(
      `update ${this.table} set ? where ${this.table_pk} = ?`,
      [data, id]
    );
    return results;
  }
  async Delete(id) {
    const results = await connection.query(
      `delete from ${this.table} where ${this.table_pk} = ?`,
      [id]
    );
    return results;
  }
}

module.exports = Model;
