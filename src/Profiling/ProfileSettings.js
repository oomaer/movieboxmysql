import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './profilesettings.css';

class ProfileSettings extends Component{

  constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: {value: '', new: false},
            confirmPass: '',
            statusMsg: ''
    }
  }

  componentDidMount(){
    let {name, email} = this.props.user;
      this.setState({
        name: name,
        email: email
      });
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
    else if(this.state.password.new === true){
      if(this.state.password.value === '' || this.state.password.value.length < 8){
        this.setState({statusMsg: 'Invalid New Password'})
      }
      else{
        this.setState({statusMsg: ''})
        return true;
      }
    }
    else{
      this.setState({statusMsg: ''})
      return true;
    }
    return false;
  } 
  
  saveChanges = () => {
    if(this.validData()){
      fetch('http://localhost:4000/editprofile', {
        method: 'post',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify(
        {
          confirmpass: this.state.confirmPass,
          current_email: this.props.user.email,
          name: this.state.name,
          password: this.state.password,
          email: this.state.email
        })
      }).then(response => {
        if(!response.ok){
          response.json().then(message => {
              if(message === 'email already entered'){
                this.setState({statusMsg: 'A account has already been registered with this email'});
              }
              else if(message === 'wrong password'){
                this.setState({statusMsg: 'Wrong Password Entered'});
              }  
              else{
                this.setState({statusMsg: 'Update Failed'});
              }
          }); 
        }
        else{
          this.setState({statusMsg: 'Your account has been updated successfully', confirmPass: ''})
          if(this.state.password.new){
            this.setState({password : {value: '', new: true}});
          }
          else{
            this.setState({password : {value: '', new: false}});
          }
        }
      })
      .catch(Error => {
        console.log(Error);
        this.setState({statusMsg: 'Error Connecting to the server'});
      })
    }
  }

  togglePassChange = () => {
    this.setState(Object.assign(this.state.password, {new: !this.state.password.new}))
    console.log(this.state.password);
  }

  onNameChange = (event) =>{
    this.setState({name: event.target.value});
  }
  onPassChange = (event) =>{
    this.setState(Object.assign(this.state.password, {value: event.target.value}));
  }
  onEmailChange = (event) =>{
    this.setState({email: event.target.value});
  }
  onConfirmPassChange = (event) =>{
    this.setState({confirmPass: event.target.value});
  }

  render() {
      return (
        <div>
        {this.props.user.email === '' ?(
          <Redirect to = '/' />
        )
        :(
            <div className = 'profile-settings-container'>
                <div className = 'profile-settings-content'>
                    <div className = 'profile-details'>
                        <div className = 'profile-details-header'>
                            <h2 id = 'profile-header-lbl'>Profile Details</h2>
                            <label for = 'seteditable'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                            </label>
                        </div>
                        <div className = 'profile-lbls'>
                            <input type = 'checkbox' id = 'seteditable'></input>
                            <label className = 'edit-profile-lbl' id = 'edit-namelbl'>Name</label>
                            <input value = {this.state.name} id = 'editnameinput' onChange = {this.onNameChange} className = 'editprofileinput'></input>
                            <label className = 'edit-profile-lbl'>Email Address</label>
                            <input type = 'email' value = {this.state.email} id = 'editemailinput' className='editprofileinput' onChange = {this.onEmailChange}></input>
                            <div className = 'hidden-settings'>
                              <label for = 'check-changepass' id = 'click-changepass' onClick = {this.togglePassChange}>Change Password</label>
                              <input type = 'checkbox' id = 'check-changepass'></input>
                              <div className = 'new-password'>  
                                <label className = 'edit-profile-lbl edit-pass-lbl'>New Password</label>
                                <input type = 'password' className = 'editprofileinput' value = {this.state.password.value} onChange = {this.onPassChange}></input>
                              </div>
                              <label className = 'edit-profile-lbl edit-pass-lbl' id = 'confirmpasslbl'>Enter Current Password to Confirm</label>
                              <input type = 'password' value = {this.state.confirmPass} className = 'editprofileinput' id = 'confirmpassinput' onChange = {this.onConfirmPassChange}></input>
                              <div className = 'commit-changes'>
                                <button id = 'save-changes-btn' onClick = {this.saveChanges}>Save Changes</button>
                                <label id = 'statusmsglbl'>{this.state.statusMsg}</label>
                              
                              </div>
                            </div>
                        </div>
                    </div>

                    <div className = 'other-info'>
                          <div className = 'help'>
                            <h2>Help and Questions</h2>
                            <label>question 1</label>
                            <label>question 2</label>
                            <label>help</label>
                          </div>
                          <div className = 'feedback'>
                              <h2>Feedback</h2>
                              <label>How was your experience with our website?</label>
                          </div>
                    </div>
                </div>
          </div>
        )}
        </div>
      );
    }


}

export default ProfileSettings;