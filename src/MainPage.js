import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
import Content from './Content'
import './mainpage.css';
import Footer from './Footer/Footer';
class MainPage extends Component {

  
  render(){
    return(
      <div className = 'main-container'>
        <Navigation user = {this.props.user}/>
        <Content user = {this.props.user} setUser = {this.props.setUser}/>
        <Footer />
       
      </div>
    );
}
}

export default MainPage;