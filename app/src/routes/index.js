import Auth from "./Auth";
import Admin from "./Admin";

const Routes = {
  dev: [...Auth.dev, ...Admin.dev],
  prod: [...Auth.production, ...Admin.production],
};

export default Routes;
