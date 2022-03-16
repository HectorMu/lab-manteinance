import Auth from "./Auth";
import Admin from "./Admin";
import User from "./User";

const Routes = {
  dev: [...Auth.dev, ...Admin.dev, ...User.dev],
  prod: [...Auth.production, ...Admin.production, ...User.production],
};

export default Routes;
