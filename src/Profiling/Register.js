
import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";
import "./profiling.css";

class Register extends Component {
constructor(props){
  super(props);
  this.state={
    name:'',
    email : '',
    password: '',
    statusMsg: ''
  }
 }

componentDidMount(){
  fetch('http://localhost:4000/register')
  .then(response => {
    if(!response.ok){
      this.setState({statusMsg: 'Error Connecting to Server'})
      throw new Error("no reponse from server")
    }
    this.setState({statusMsg: ''})
  })
  .catch(err => {
    this.setState({statusMsg: 'Error Connecting to Server'})
  })
}

validEmail = () => {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email)){
    return true
  }
    return false
}

validData = () => {
  if(this.state.name === ''){
    this.setState({statusMsg: 'Invalid Name'})
  }
  else if(this.state.email === '' || !this.validEmail()){
    this.setState({statusMsg: 'Invalid Email'})
  }
  else if(this.state.password === '' || this.state.password.length < 8){
    this.setState({statusMsg: 'Invalid Password'})
  }
  else{
    this.setState({statusMsg: ''})
    return true;
  }
  return false;
} 

onClick = () => {
  if(this.validData()){
    fetch('http://localhost:4000/register', {
      method: 'post',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify(
      {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => {
      if(!response.ok){
        response.json().then(message => {
            if(message === 'email already entered'){
              this.setState({statusMsg: 'This Account Already Exists'});
            }
            else{
              this.setState({statusMsg: 'Registration Failed'});
            }  
        }); 
      }
      else{
        this.setState({statusMsg: 'Registration Successful',
                        name: '',
                        email: '',
                        password: ''
        })
        for(let element of document.getElementsByClassName('input')){
          element.value = '';
        }
      }
    })
    .catch(Error => {
      console.log(Error);
      this.setState({statusMsg: 'Error Connecting to the server'});
    })
  }
}

onNameChange = (event) =>{
  this.setState({name: event.target.value});
}
onPassChange = (event) =>{
  this.setState({password: event.target.value});
}
onEmailChange = (event) =>{
  this.setState({email: event.target.value});
}

render() {
    return (
      <div className = "background bgsignup">
          {this.state.RegistrationMsg === 'success' ? 
          (<Redirect to="/signin" /> )
            : 
            (<div className = "card cardsignup">
            <h2 className = 'headinglbl lbl'>Sign Up</h2>
            <label className = 'namelabel lbl'>Name: </label>
            <input className = 'input' onChange = {this.onNameChange}></input>    
            <label className = 'emaillabel lbl'>Email Address: </label>
            <input type = "email" placeholder = 'someone@someone.com' className = 'input' onChange = {this.onEmailChange}></input>
            <label className = 'passwordlabel lbl'>Password: </label>
            <input type = "password" className = 'input' placeholder = 'at least 8 characters' onChange = {this.onPassChange}></input>
            <button className = 'clickbtn registerbtn' onClick = {this.onClick}>Register</button><br />
            <span className = 'reflabel'>or goto <Link to = '/signin'>
              <label className='reflink'>sign in</label>
              </Link>
            </span>
            <label className= "lbl statuslbl">{this.state.statusMsg}</label>
            </div>
            )
          }
      
      </div>
        
    );
  }
}

export default Register;