import Auth from "./Auth";

const Routes = {
  dev: [...Auth.dev],
  prod: [...Auth.production],
};

export default Routes;
