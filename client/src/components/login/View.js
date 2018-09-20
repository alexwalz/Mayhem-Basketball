/* eslint-disable no-undef */
import { Button, Form, Icon, Message, Loader } from 'semantic-ui-react'
import React, { Component} from 'react'
import './styles.css'
import axios from 'axios'



class LoginForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            username: "",
            password: "",
            submitting: false,
            message: ""
		}
    }

    componentDidMount=()=>{
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.get('/api/users/authenticate').then(function(response){
          window.location='/profile'
        }).catch(function(err){
          console.log(err)
        })
    }

     errorMessage = () => {
         return(
            <Message negative>
            <Message.Header>Error Logging In</Message.Header>
                <p>{this.state.message}</p>
            </Message>
         )
    }

    

    handleInputChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
        });
    }

    handleSubmit=(e)=>{

        this.setState({submitting: true})

        e.preventDefault()

        axios.post('api/auth/login', this.state)

        .then((result) => {

            localStorage.setItem('jwtToken', result.data.token);

            this.props.history.push('/profile')

          })

          .catch((error) => {

            console.log(error)

            this.setState({error: true, errMessage: 'Login failed. Username or password not match', submitting: false})

            if(error.response.status === 401) {
              console.log(error)  
              this.setState({ message: 'Login failed. Username or password not match' });
            }else if(error.response.status === 403){
                console.log(error)  
                this.setState({ message: 'You have not verified your email address.  Please check your email' });
            }else if(error.response.status === 400){
                this.setState({message: "Authentication failed. Invalid Username."})
            }

          });

    }


    render() {

      return ( 
            <div className='login-page-container'>

                <div className='form-container'>

                    <div className='login-page-home-link'><a href='/'><Icon disabled name='arrow left' />Back to Home</a></div>

                    {this.state.error ? this.errorMessage() : null}


                    <Form>
                        <Form.Field>
                        <label style={{color: "#FB3668"}}>Username</label>
                        <input onChange={this.handleInputChange} placeholder='' name='username'/>
                        </Form.Field>
                        <Form.Field>
                        <label style={{color: "#FB3668"}}>Password</label>
                        <input onChange={this.handleInputChange} placeholder='*********' type='password' name='password'/>
                        </Form.Field>

                        {this.state.submitting ? 
                            <Button type='submit' disabled={true} onClick={this.handleSubmit} style={{backgroundColor: "#FB3668", color: "white", width: "100%", marginTop: "20px"}}><Loader size='big' active inverted/>Logging In</Button>
                            :
                            <Button type='submit' onClick={this.handleSubmit} style={{backgroundColor: "#FB3668", color: "white", width: "100%", marginTop: "20px"}}>Login</Button>
                        }
                        
                        <br/>
                        <p style={{color: "white", marginTop: "30px"}}>To create a new account <a href='/signup' style={{color: "#FB3668", paddingLeft: "9px"}}>Click Here</a></p>
                    </Form>

                </div>
                
            </div>
                
        )
    }
  }
  
  export default LoginForm;