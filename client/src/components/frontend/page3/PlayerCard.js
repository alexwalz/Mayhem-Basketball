import React, { Component} from 'react'
import './page3.css'
import {Divider, Grid, Message, Form, Button, Loader, Icon} from 'semantic-ui-react'
import axios from 'axios'
const stockImage = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"


class PlayerCard extends Component {
	constructor(props) {
        super(props);
		this.state={
            edit: false,
            player: {},
            authUser: {
                role: 'employee'
            }

		}
    }

    componentDidMount=(props)=>{
        let currentComponent = this
        currentComponent.setState({player: this.props.player})
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        axios.get('/api/users/authenticate').then(function(response){
            currentComponent.setState({authUser: response.data.authenticatedUser}, function(){console.log(this.state)})
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
        axios.put('api/players/' + this.state.player._id, this.state)
        .then((result) => {
            console.log(result)
            if(result.status === 200){
                this.setState({player: result.data, edit: false, submitting: false})
                window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error)
          });
    }

    edit=()=>{
        this.setState({edit: true})
    }

    playerCard =()=>{
        return(
            <div className='player-card-container'>
                {this.state.authUser.role === 'admin' ?
                    <div className='player-card-edit'>
                        <Icon name='pencil' onClick={this.edit}></Icon>
                    </div> : null}

                <div className='player-card-section-1'>
                    <img className='player-card-picture' alt='Player Card' src={this.state.player.image} />
                </div>

                <div className='player-card-section-2'>

                    <Divider horizontal>{this.state.player.grade} Grade</Divider>
                    <h1 className='player-card-player-name title'>{this.state.player.first_name + " " + this.state.player.last_name}</h1>
                    <p className='player-card-player-position'>{this.state.player.position}</p>
                    <hr style={{backgroundColor: "lightgrey"}}/>

                    <div className='player-card-player-stats'>

                        <Grid columns={2} centered>

                            <Grid.Row>

                                <Grid.Column>
                                    <p>Height</p>
                                </Grid.Column>

                                <Grid.Column textAlign='right'>
                                    <p>{this.state.player.height}</p>
                                </Grid.Column>

                            </Grid.Row>

                            <Grid.Row>

                                <Grid.Column>
                                    <p>Handed</p>
                                </Grid.Column>

                                <Grid.Column textAlign='right'>
                                    <p>{this.state.player.handed}</p>
                                </Grid.Column>

                            </Grid.Row>

                            <Grid.Row>

                                <Grid.Column>
                                    <p>Favorite Player</p>
                                </Grid.Column>

                                <Grid.Column textAlign='right'>
                                    <p>{this.state.player.favorite_player}</p>
                                </Grid.Column>

                            </Grid.Row>

                        </Grid>

                    </div>

                </div>

                <div className='player-card-section-3'>

                </div>

            </div>
        )

    }


    editCard=()=>{
        return(
            <div className='player-card-container'>

                <Form style={{marginLeft: "auto", marginRight: "auto"}}>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Grade</label>
                            <input onChange={this.handleInputChange} placeholder='5th' name='grade'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Position</label>
                            <input onChange={this.handleInputChange} placeholder='Point Guard' name='position'/>
                        </Form.Field>


                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Handed</label>
                            <input onChange={this.handleInputChange} placeholder='Right' name='handed'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Height</label>
                            <input onChange={this.handleInputChange} placeholder='5`2"' name='height'/>
                        </Form.Field>

                        <Form.Field>
                            <label style={{color: "#3261D6"}}>Favorite Player</label>
                            <input onChange={this.handleInputChange} placeholder='John Stockton' name='favorite_player'/>
                        </Form.Field>


                    <Form.Field>
                        <label style={{color: "#3261D6"}}>Image URL</label>
                        <input onChange={this.handleInputChange} placeholder='https://' name='image'/>
                    </Form.Field>


                    {this.state.submitting ? 
                        <Button disabled={true} onClick={this.handleSubmit} type='submit' style={{backgroundColor: "#3261D6", color: "white", width: "100%", marginTop: "10px"}}><Loader size='big' active />Editing Account</Button> 
                        :
                        <Button onClick={this.handleSubmit} disabled={this.state.formErrors} type='submit' style={{backgroundColor: "#3261D6", color: "white", width: "100%", marginTop: "10px"}}>Save Player</Button>
                    }

                </Form>

            </div>

        )
    }

    render() {

        if(this.props.player.image === ''){
            this.props.player.image = stockImage
        }

      return ( 

            this.state.edit ? this.editCard() : this.playerCard()
            
        )
    }
  }
  
export default PlayerCard