import IsLoggedIn from "../components/Authentication/IsLoggedIn";
import Users from "../pages/Admin/Users/Users";
import Add from "../pages/Admin/Users/Add";
import Edit from "../pages/Admin/Users/Edit";
const Template = {
  dev: [
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/users/add",
      element: <Add />,
    },
    {
      path: "/users/edit/:id",
      element: <Edit />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/users",
      element: <IsLoggedIn view={Users} />,
    },
    {
      path: "/users/add",
      element: <IsLoggedIn view={Add} />,
    },
    {
      path: "/users/edit/:id",
      element: <IsLoggedIn view={Edit} />,
    },
  ],
};

export default Template;
