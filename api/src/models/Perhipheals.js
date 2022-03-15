const Model = require("./Model");

class Perhipheal extends Model {
  constructor() {
    super();
    this.table = "computer_perhipheals";
    this.table_pk = "fk_computer";
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

module.exports = Perhipheal;
