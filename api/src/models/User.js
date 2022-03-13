const Model = require("./Model");

class User extends Model {
  constructor() {
    super();
    this.table = "users";
    this.table_pk = "id";
  }
  async List() {
    let users = await super.List();

    users.map((u) => {
      delete u.password;
      return u;
    });
    return users;
  }
  async FindOne(id) {
    return await super.FindOne(id);
  }
  async Create(data) {
    return await super.Create(data);
  }
  async Update(data, id) {
    return await super.Update(data, id);
  }
  async Delete(id) {
    return await super.Delete(id);
  }
}

module.exports = User;
