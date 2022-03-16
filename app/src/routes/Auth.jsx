import IsAlreadyLogged from "../components/Authentication/IsAlreadyLogged";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

const Template = {
  dev: [
    {
      path: "/login",
      element: <Login />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/login",
      element: <IsAlreadyLogged view={Login} />,
    },
  ],
};

export default Template;
