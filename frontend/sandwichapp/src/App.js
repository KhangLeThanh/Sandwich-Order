import React, { Component } from 'react';
import {Route, BrowserRouter as Router,  Switch} from 'react-router-dom';

//import logo from './logo.svg';
import './App.css';
import Sandwich from './component/Sandwich';
import Topping from './component/Topping';
import Login from './component/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/sandwich" component={Sandwich} />
          <Route path="/topping" component={Topping} />
        </Switch>
      </Router>
    );
  }
}

export default App;
