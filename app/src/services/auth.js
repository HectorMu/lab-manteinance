import API from "../config/API";

const Login = async (credentials) => {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => {
  window.localStorage.removeItem("labSession");
};

export default { Login, Logout };
