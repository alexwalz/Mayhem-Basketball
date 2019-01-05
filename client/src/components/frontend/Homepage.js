import React, { Component } from 'react';
import axios from 'axios'
import './homepage.css'
import Page1 from './page1/View'
import Page2 from './page2/View'
import Page3 from './page3/View'


class HomePage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      update: false,
      authenticated: false
    };

}


  componentDidMount=()=>{

    var currentComponent = this

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

    axios.get('/api/users/authenticate').then(function(response){
      currentComponent.setState({authUser: response.data.authenticatedUser, update: true, authenticated: true})
    }).catch(function(err){
      console.log(err)

    })
  }


  render() {

    return (
      <div className="App homepage">
            <Page1/>
            <Page2/>
            <Page3/>
      </div>
    );
  }
}

export default HomePage;
