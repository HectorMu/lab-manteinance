import IsAdmin from "../components/Authentication/IsAdmin";
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
//
import Maintenances from "../pages/Admin/Maintenance/Maintenances";
import AddMaintenance from "../pages/Admin/Maintenance/Add";
import EditMaintenance from "../pages/Admin/Maintenance/Edit";
//
import Tickets from "../pages/Admin/Tickets/Tickets";
import AddTicket from "../pages/Admin/Tickets/Add";
import EditTicket from "../pages/Admin/Tickets/Edit";
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
    {
      path: "/maintenances",
      element: <Maintenances />,
    },
    {
      path: "/maintenances/add",
      element: <AddMaintenance />,
    },
    {
      path: "/maintenances/edit/:id",
      element: <EditMaintenance />,
    },
    {
      path: "/tickets",
      element: <Tickets />,
    },
    {
      path: "/tickets/add",
      element: <AddTicket />,
    },
    {
      path: "/tickets/edit/:id",
      element: <EditTicket />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/users",
      element: <IsAdmin view={Users} />,
    },
    {
      path: "/users/add",
      element: <IsAdmin view={AddUser} />,
    },
    {
      path: "/users/edit/:id",
      element: <IsAdmin view={EditUser} />,
    },
    {
      path: "/labs",
      element: <IsAdmin view={Labs} />,
    },
    {
      path: "/labs/add",
      element: <IsAdmin view={AddLab} />,
    },
    {
      path: "/labs/edit/:id",
      element: <IsAdmin view={EditLab} />,
    },
    {
      path: "/computers",
      element: <IsAdmin view={Computers} />,
    },
    {
      path: "/computers/add",
      element: <IsAdmin view={AddComputer} />,
    },
    {
      path: "/computers/edit/:id",
      element: <IsAdmin view={EditComputer} />,
    },
    {
      path: "/maintenances",
      element: <IsAdmin view={Maintenances} />,
    },
    {
      path: "/maintenances/add",
      element: <IsAdmin view={AddMaintenance} />,
    },
    {
      path: "/maintenances/edit/:id",
      element: <IsAdmin view={EditMaintenance} />,
    },
    {
      path: "/tickets",
      element: <IsAdmin view={Tickets} />,
    },
    {
      path: "/tickets/add",
      element: <IsAdmin view={AddTicket} />,
    },
    {
      path: "/tickets/edit/:id",
      element: <IsAdmin view={EditTicket} />,
    },
  ],
};

export default Template;
