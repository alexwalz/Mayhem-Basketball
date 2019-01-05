import React, {Component} from 'react'
import { Icon, Menu, Sidebar, Label } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './styles.css'
import axios from 'axios'

class LeftSidebar extends Component {
    
	constructor(props) {
        super(props);
		this.state={
            authUser: {
                role: 'customer'
            }
		}
    }

    componentDidMount=()=>{


        let currentComponent = this
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({authUser: response.data.authenticatedUser})

        }).catch(function(err){
            window.location = '/'
            console.log(err)
        })

    }

    logout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
      }

    render() {

        return(
            <Sidebar as={Menu}  icon='labeled' inverted vertical visible width='thin'>

                <Link to='/'><Menu.Item as='a' style={{backgroundColor: "#3261D6"}}>
                    <Icon name='home' />
                    Home
                </Menu.Item></Link>

                <Menu.Item as='a' onClick={this.logout}>
                    <Icon name='arrow left' />
                    Logout
                </Menu.Item>

                {this.state.authUser.role === 'admin' ? 

                    <Link to='/players'><Menu.Item as='a' >
                        <Icon name='users' />
                        Players
                    </Menu.Item></Link>

                : null}

                
            </Sidebar>
        )
    }
}

export default LeftSidebar