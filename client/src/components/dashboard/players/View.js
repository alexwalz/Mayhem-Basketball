/* eslint-disable no-undef */
import React, { Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import NewPlayerForm from './NewPlayerForm'
import Sidebar from '../../global/navigation/Sidebar'
import Page3 from '../../frontend/page3/View'



class Players extends Component {
	constructor(props) {
        super(props);
		this.state={
            authUser:{
                role: ""
            }
		}
    }

    componentDidMount=()=>{
        
        let currentComponent = this

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({authUser: response.data.authenticatedUser})
          
        }).catch(function(err){
          console.log(err)
        })
    }





    render() {

      return ( 

            <div>
                <Sidebar/>
                <div style={{marginLeft: "150px"}}>
                    <div style={{paddingTop: "50px"}}>
                        <NewPlayerForm/>
                    </div>
                    
                    <div style={{textAlign: "center", paddingTop: "40px"}}>
                        <Page3/>
                    </div>
                    

                </div>
                

            </div>
                
        )
    }
  }
  
  export default Players;