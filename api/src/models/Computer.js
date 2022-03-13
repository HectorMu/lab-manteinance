const Model = require("./Model");

class Computer extends Model {
  constructor() {
    super();
    this.table = "computer";
    this.table_pk = "id";
  }
  async List() {
    return super.List();
  }
  async FindOne(id) {
    return super.FindOne(id);
  }
  async Create(data) {
    return super.Create(data);
  }
  async Update(data, id) {
    return super.Update(data, id);
  }
  async Delete(id) {
    return super.Delete(id);
  }
}

module.exports = Computer;
