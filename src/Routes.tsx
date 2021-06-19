import App from "./App";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:code" children={<App />} />
        <Route path="/" children={<App />} />
      </Switch>
    </Router>
  );
};
