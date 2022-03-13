const Model = require("./Model");

class Lab extends Model {
  constructor() {
    super();
    this.table = "laboratory";
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

module.exports = Lab;
