
import React, {Component} from 'react';
import {Link, Route, Redirect} from "react-router-dom";
import "./profiling.css";

class Login extends Component {
constructor(){
  super();
  this.state={
    
    email: '',
    password: '',
    isAuth : false,
    statusMsg: ''
  }
 }

componentDidMount(){
  fetch('http://localhost:4000/signin')
  .then( response => {
    if(!response.ok){
      this.setState({statusMsg: 'Error Connecting to Server'})
      throw new Error("error connecting to server");
    }
    this.setState({statusMsg: ''})
  })
  .catch(err => {
    this.setState({statusMsg: 'Error Connecting to Server'})
  })
}

checkAuth = () => {
  if(this.validData()){
  fetch('http://localhost:4000/signin', {
    method: 'post',
    headers : {'Content-Type' : 'application/json'},
    body: JSON.stringify(
    {
      email: this.state.email,
      password: this.state.password,
    })
  }).then(response => {
    if(!response.ok){
      response.json().then(msg => {
        if(msg === 'account not found'){
          this.setState({statusMsg: 'No Account Registered with this Email'});
        }
        else if(msg === 'wrong password'){
          this.setState({statusMsg: "Incorrect Passsword"});
        }
        else if(msg === 'authentication error'){
          this.setState({statusMsg: "Error Signing In"});
        }
      })
    }
    else{
      response.json().then(result => {
        console.log(result);
        this.props.setUser(result);
        this.setState({isAuth: true});
      })
    }
  
  })
  .catch(err => {
    this.setState({statusMsg: 'Error Connecting to Server'})
  });
  }
} 

validEmail = () => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){
     return true
   }
     return false
}

validData = () => {
  if(this.state.email === '' || !this.validEmail()){
    this.setState({statusMsg: 'Invalid Email'})
  }
  else if(this.state.password === ''){
    this.setState({statusMsg: 'Invalid Password'})
  }
  else{
    this.setState({statusMsg: ''})
    return true;
  }
  return false;
} 

onEmailChange = (event) => {
  this.setState({email: event.target.value});
}

onPassChange = (event) => {
  this.setState({password: event.target.value});
}

render() {
    
    return (
      <div className = "background bgsignin">
        <div className = "card cardsignin">
          <h2 className = "headinglbl" >Sign In</h2>
          <label className = "lbl">Email Address: </label>
          <input type = 'email' className = 'input' onChange = {this.onEmailChange}></input>
          <label className = 'lbl'>Password: </label>
          <input type = 'password' className = 'input' onChange = {this.onPassChange}></input>
          <Route exact path="/signin">
            {this.state.isAuth ? <Redirect to="/" /> 
            : <button className = 'clickbtn signinbtn' onClick = {this.checkAuth}>Sign In</button>}
          </Route>
          <span className = 'reflabel'>or goto <Link to = "/register">
              <label className= 'reflink'>sign up</label>
              </Link>
            </span>
          <label className= "lbl statuslbl">{this.state.statusMsg}</label>
        </div>
         
      </div>
    );
  }
}

export default Login;