import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>Test</div>
        </Route>
        {/* <Route path="/signin">
          <SigninPage />
        </Route>
        <Route path="/browse">
          <BrowsePage />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
