import API from "../../config/API";

const List = async () => {
  try {
    const response = await fetch(`${API}/users/getall`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export default { List };
