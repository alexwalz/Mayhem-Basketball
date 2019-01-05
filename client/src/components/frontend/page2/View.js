import React from 'react'
import './page2.css'
import {Grid, Image, Header, Icon} from 'semantic-ui-react'
import champImage from '../../../images/homepage-champs.jpg'

const Page2 =()=>{ 
    return(
        <div className='page-2-container'>

            <div className='page-2-section-1'>

            </div>

            <div className='page-2-section-2'>
                <Grid padded stackable>
                    <Grid.Row columns={2} stackable>

                        <Grid.Column>

                            <div className='page-2-section-championship'>
                                <h1 className='title championship-title'>Championship Driven</h1>
                                <h4 className='subtitle championship-subtitle'>22 Championships and counting</h4>
                            </div>
                            
                            <p className='championship-text'>Our club is built on championship level competition.  We expect 
                            to compete at all levels and build character along the way. We have competed and won at the most 
                            competative tournaments across the Salt Lake Valley.  We build winners.</p>
                        </Grid.Column>

                        <Grid.Column>
                            <Image src={champImage} rounded spaced size='large' style={{backgroundColor: "white", padding: "10px", marginTop: "13px"}}/>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>

            <div className='page-2-section-3'>

                <Grid columns={4} centered stackable textAlign='center'>

                    <Grid.Row centered>

                        <Grid.Column>
                              <Header as='h2' icon>
                                <Icon color='blue' name='users' />
                                Coaching
                                <Header.Subheader style={{color: "lightgrey"}}>We believe that every championship level team starts with championship level coaching.  We've gone out
                                and found the best coaches in the valley to lead our teams to high level competition year over year.</Header.Subheader>
                            </Header>
                        </Grid.Column>

                        <Grid.Column>
                            <Header as='h2' icon>
                                <Icon color='blue' name='wrench' />
                                Fundamentals
                                <Header.Subheader style={{color: "lightgrey"}}>We believe that every championship level player has strong fundamentals.  We coach to thsi every practice
                                to set your player up for success now and for the future.</Header.Subheader>
                            </Header>
                        </Grid.Column>

                        <Grid.Column>
                        <Header as='h2' icon>
                            <Icon color='blue' name='user' />
                            Character
                            <Header.Subheader style={{color: "lightgrey"}}>We believe that every champion player has champion character.  We focus on building your player up as a ball 
                            player, but more importantly as an individual.</Header.Subheader>
                        </Header>
                        </Grid.Column>

                    </Grid.Row>

                </Grid>

            </div>

        </div>
    )
}

export default Page2