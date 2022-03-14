import API from "../../config/API";

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

const Save = async (data) => {
  try {
    const response = await fetch(`${API}/users/save`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Update = async (data, id) => {
  try {
  } catch (error) {}
};

export default { List, ListOne };
