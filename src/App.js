import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Component/Login';
import Dialogflows from './Component/Dialogflow';
// import GoogleSheet from './Component/GoogleSheet';
import Create from './Component/Create'
// import Corona from './Component/Corona'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/download" component={Dialogflows} />
              {/* <Route exact path="/googlesheet" component={GoogleSheet} /> */}
              <Route exact path="/create" component={Create} />
              {/* <Route exact path="/coronavirus" component={Corona} /> */}
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;