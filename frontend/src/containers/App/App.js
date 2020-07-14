import React, { Component } from 'react';
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Home from '../Home/Home'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>

            <Route exact path='/'>
              <Home />
            </Route> 

            <Route exact path='/login'>
              <Login />      
            </Route>

            <Route exact path='/signup'>
              <Signup />
            </Route>
            
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;