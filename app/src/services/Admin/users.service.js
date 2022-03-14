import API from "../../config/API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(`${API}/users/getall`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const ListOne = async (id) => {
  try {
    const response = await fetch(`${API}/users/getone/${id}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Save = async (user) => {
  try {
    const response = await fetch(
      `${API}/users/save`,
      helpers.authPostConfig(user)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (user, id) => {
  try {
    const response = await fetch(
      `${API}/users/update/${id}`,
      helpers.authPutConfig(user)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/users/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List, ListOne, Save, Update, Delete };
