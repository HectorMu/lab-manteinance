const Model = require("./Model");

class User extends Model {
  constructor() {
    super();
    this.table = "users";
    this.table_pk = "id";
  }
  async List() {
    const users = await this.connection.query(
      "select u.id, u.username, u.fullname, u.email, u.fk_rol as rol_id, r.description as rol_name from users u, roles r where u.fk_rol = r.id"
    );

    return users;
  }
  async FindOne(id) {
    const user = await super.FindOne(id);
    delete user.password;
    return user;
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
