import API from "../../config/API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(
      `${API}/computers/getall`,
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
      `${API}/computers/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Save = async (computer) => {
  try {
    const response = await fetch(
      `${API}/computers/save`,
      helpers.authPostConfig(computer)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (computer, id) => {
  try {
    const response = await fetch(
      `${API}/computers/update/${id}`,
      helpers.authPutConfig(computer)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/computers/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List, ListOne, Save, Update, Delete };
