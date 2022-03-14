import API from "../../config/API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(`${API}/labs/getall`, helpers.authGetConfig());
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const ListOne = async (id) => {
  try {
    const response = await fetch(
      `${API}/labs/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Save = async (lab) => {
  try {
    const response = await fetch(
      `${API}/labs/save`,
      helpers.authPostConfig(lab)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (lab, id) => {
  try {
    const response = await fetch(
      `${API}/labs/update/${id}`,
      helpers.authPutConfig(lab)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/labs/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List, ListOne, Save, Update, Delete };
