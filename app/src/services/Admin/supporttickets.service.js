import API from "../../config/API";
import helpers from "../../helpers/helpers";

const List = async () => {
  try {
    const response = await fetch(
      `${API}/support-ticket/getall`,
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
      `${API}/support-ticket/getone/${id}`,
      helpers.authGetConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Save = async (data) => {
  const ticket = {
    ...data,
    lifting_date: new Date().toLocaleString(),
  };

  try {
    const response = await fetch(
      `${API}/support-ticket/save`,
      helpers.authPostConfig(ticket)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (ticket, id) => {
  try {
    const response = await fetch(
      `${API}/support-ticket/update/${id}`,
      helpers.authPutConfig(ticket)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (id) => {
  try {
    const response = await fetch(
      `${API}/support-ticket/delete/${id}`,
      helpers.authDeleteConfig()
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List, ListOne, Save, Update, Delete };
