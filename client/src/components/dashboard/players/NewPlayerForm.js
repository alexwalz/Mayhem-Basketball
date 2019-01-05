/* eslint-disable no-undef */
import { Button, Form, Segment, Container, Message, Loader } from 'semantic-ui-react'
import React, { Component} from 'react'
import axios from 'axios'
import AWSfileUpload from './awsFileUpload'
import {Link} from 'react-router-dom'



class NewPlayerForm extends Component {
	constructor(props) {
        super(props);
		this.state={
            first_name: "",
            last_name: "",
            grade: "",
            position: "",
            handed: "",
            height: "",
            favorite_player: "",
            image: "",
            error: false,
            errorMessage: "",
            submitting: false,
		}
    }

    componentDidMount=()=>{
        
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        axios.get('/api/users/authenticate').then(function(response){

            currentComponent.setState({authUser: response.data.authenticatedUser})
          
        }).catch(function(err){
          console.log(err)
        })
    }

    errorMessage = () => {
        return(
           <Message negative>
           <Message.Header>Error Creating Player</Message.Header>
               <p>{this.state.errorMessage}</p>
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

        e.preventDefault()

        this.setState({
            submitting: true
        })

        axios.post('api/players', this.state)
        .then((result) => {

            console.log(result)
            
          })
          .catch((error) => {
            console.log(error)
          });

    }


    render() {

      return ( 

        <Container>
            <Segment>
                <Form style={{marginLeft: "auto", marginRight: "auto"}}>

                    <Form.Group>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>First Name</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='John' name='first_name'/>
                        </Form.Field>
                        
                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Last Name</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='Doe' name='last_name'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Grade</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='5th' name='grade'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Position</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='Point Guard' name='position'/>
                        </Form.Field>

                    </Form.Group>

                    <Form.Group inline>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Handed</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='Right' name='handed'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Height</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='5`2"' name='height'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Favorite Player</label>
                            <br/>
                            <input onChange={this.handleInputChange} placeholder='John Stockton' name='favorite_player'/>
                        </Form.Field>

                    </Form.Group>
                    

                    <Form.Field>
                        <label style={{color: "#3261D6"}}>Image URL</label>
                        <br/>
                        <input onChange={this.handleInputChange} placeholder='https://' name='image'/>
                    </Form.Field>

                    <AWSfileUpload />



                    {this.state.submitting ? 
                        <Button disabled={true} onClick={this.handleSubmit} type='submit' style={{backgroundColor: "#3261D6", color: "white", width: "100%", marginTop: "20px"}}><Loader size='big' inverted active />Creating Account</Button> 
                        :
                        <Button onClick={this.handleSubmit} disabled={this.state.formErrors} type='submit' style={{backgroundColor: "#3261D6", color: "white", width: "100%", marginTop: "20px"}}>Create Player</Button>
                    }

                </Form>
            </Segment>
        </Container>

        

                
        )
    }
  }
  
  export default NewPlayerForm;