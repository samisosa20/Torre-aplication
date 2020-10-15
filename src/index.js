import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./views/App";
import NotFoundPage from "./views/NotFoundPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/search/:type" exact component={App} />
      <Route path="/404" status={404} component={NotFoundPage} />
      <Redirect from="/" exact to="/search/people" />
      <Redirect from="*" to="/404" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
