import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        {/* <Route path="/signin">
          <SigninPage />
        </Route> */}
        <Route path="/browse">
          <BrowsePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
