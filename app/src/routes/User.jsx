import DoMaintenance from "../pages/User/DoMaintenance";
import Tickets from "../pages/User/Tickets";
import IsUser from "../components/Authentication/IsUser";

const Template = {
  dev: [
    {
      path: "/user/tickets",
      element: <Tickets />,
    },
    {
      path: "/user/do-maintenance/:id/:pcid",
      element: <DoMaintenance />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/user/tickets",
      element: <IsUser view={Tickets} />,
    },
    {
      path: "/user/do-maintenance/:id/:pcid",
      element: <IsUser view={DoMaintenance} />,
    },
  ],
};

export default Template;
