import API from "../../config/API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(
      `${API}/maintenance/getall`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const ListOne = async (id) => {
  try {
    const response = await fetch(
      `${API}/maintenance/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Save = async (maintenance) => {
  try {
    const response = await fetch(
      `${API}/maintenance/save`,
      helpers.authPostConfig(maintenance)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (maintenance, id) => {
  try {
    const response = await fetch(
      `${API}/maintenance/update/${id}`,
      helpers.authPutConfig(maintenance)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/maintenance/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List, ListOne, Save, Update, Delete };
