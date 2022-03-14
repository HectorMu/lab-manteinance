import IsLoggedIn from "../components/Authentication/IsLoggedIn";
//
import Users from "../pages/Admin/Users/Users";
import AddUser from "../pages/Admin/Users/Add";
import EditUser from "../pages/Admin/Users/Edit";
//
import Labs from "../pages/Admin/Labs/Labs";
import AddLab from "../pages/Admin/Labs/Add";
import EditLab from "../pages/Admin/Labs/Edit";
//
import Computers from "../pages/Admin/Computers/Computers";
import AddComputer from "../pages/Admin/Computers/Add";
import EditComputer from "../pages/Admin/Computers/Edit";
const Template = {
  dev: [
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/users/add",
      element: <AddUser />,
    },
    {
      path: "/users/edit/:id",
      element: <EditUser />,
    },
    {
      path: "/labs",
      element: <Labs />,
    },
    {
      path: "/labs/add",
      element: <AddLab />,
    },
    {
      path: "/labs/edit/:id",
      element: <EditLab />,
    },
    {
      path: "/computers",
      element: <Computers />,
    },
    {
      path: "/computers/add",
      element: <AddComputer />,
    },
    {
      path: "/computers/edit/:id",
      element: <EditComputer />,
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
      element: <IsLoggedIn view={AddUser} />,
    },
    {
      path: "/users/edit/:id",
      element: <IsLoggedIn view={EditUser} />,
    },
    {
      path: "/labs",
      element: <IsLoggedIn view={Labs} />,
    },
    {
      path: "/labs/add",
      element: <IsLoggedIn view={AddLab} />,
    },
    {
      path: "/labs/edit/:id",
      element: <IsLoggedIn view={EditLab} />,
    },
    {
      path: "/computers",
      element: <IsLoggedIn view={Computers} />,
    },
    {
      path: "/computers/add",
      element: <IsLoggedIn view={AddComputer} />,
    },
    {
      path: "/computers/edit/:id",
      element: <IsLoggedIn view={EditComputer} />,
    },
  ],
};

export default Template;
