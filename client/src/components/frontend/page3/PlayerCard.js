import React from 'react'
import './page3.css'
import {Divider, Grid} from 'semantic-ui-react'
const stockImage = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"


const PlayerCard = (props) =>{

    if(props.player.image === ""){
        props.player.image = stockImage
    }
    
    return(
        <div className='player-card-container'>

            <div className='player-card-section-1'>
                <img className='player-card-picture' alt='Player Card' src={props.player.image} />
            </div>

            <div className='player-card-section-2'>

                <Divider horizontal>{props.player.grade} Grade</Divider>
                <h1 className='player-card-player-name title'>{props.player.first_name + " " + props.player.last_name}</h1>
                <p className='player-card-player-position'>{props.player.position}</p>
                <hr style={{backgroundColor: "lightgrey"}}/>

                <div className='player-card-player-stats'>

                    <Grid columns={2} centered>

                        <Grid.Row>

                            <Grid.Column>
                                <p>Height</p>
                            </Grid.Column>

                            <Grid.Column textAlign='right'>
                                <p>{props.player.height}</p>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>

                            <Grid.Column>
                                <p>Handed</p>
                            </Grid.Column>

                            <Grid.Column textAlign='right'>
                                <p>{props.player.handed}</p>
                            </Grid.Column>

                        </Grid.Row>

                        <Grid.Row>

                            <Grid.Column>
                                <p>Favorite Player</p>
                            </Grid.Column>

                            <Grid.Column textAlign='right'>
                                <p>{props.player.favorite_player}</p>
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

export default PlayerCard