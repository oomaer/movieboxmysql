
import './App.css';
import React, { Component } from 'react';
import Login from './Profiling/Login';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import MainPage from './MainPage';
import Register from './Profiling/Register';
class App extends Component {
  constructor(){
    super();
    this.state = {
      user : {
        name: '',
        email: '',
        admin:false
      }
    }
  }

  setUser = (user) => {
    this.setState({user: user});
  }

  render(){
    return(
      <Router>
      <div className= 'app'>
        <Switch>
          <Route exact path = "/signin" render={(props) => <Login setUser={this.setUser} />} />
          <Route exact path = "/register" component = {Register} />
          <Route path = "/" render={(props) => <MainPage user = {this.state.user} setUser = {this.setUser} />} />
        </Switch>     
      </div>
      </Router>
    )
  }
}

export default App;
