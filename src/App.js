import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/subscription">
          <SubscriptionPage />
        </Route>
        <Route path="/browse">
          <BrowsePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
