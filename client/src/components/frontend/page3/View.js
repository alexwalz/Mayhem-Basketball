import React, { Component } from 'react';
import axios from 'axios'
import './page3.css'
import {Grid} from 'semantic-ui-react'
import PlayerCard from './PlayerCard'


class Page3 extends Component {

  constructor(props) {

    super(props);

    this.state = {
      update: false,
      authenticated: false,
      players: {}
    };

}


  componentDidMount=()=>{

    let currentComponent = this

    axios.get('/api/players').then(function(response){
      console.log(response.data)
      currentComponent.setState({players: response.data, update: true})

    }).catch(function(err){

      console.log(err)

    })
  }


  render() {

    return (
      <div className="page-3-container">

            <div className='page-3-section-1'>
                <h1 className='team-title title'>Meet The Team</h1>
                <h4 className='team-subtitle subtitle'>Mayhem Basketball</h4>
            </div>

            <div className='page-3-section-2'>

            <Grid columns={5} centered stackable>

                <Grid.Row centered>

                  {this.state.update ? this.state.players.map(player=>{
                    return(
                      <Grid.Column>
                        <PlayerCard player={player}/>
                      </Grid.Column>
                    )
                  }) : null }

                </Grid.Row>
            </Grid>
                
            </div>
            
      </div>
    );
  }
}

export default Page3;