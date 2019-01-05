import React, { Component } from 'react';
import './page1.css'
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
}


  render() {
    return (
      <div className='page-1-container'>

        <div style={{position: "absolute", top: "20px", right: '20px'}}>

          <Button.Group>

            <Link to='/login'>
              <Button animated color='blue'>
                <Button.Content visible>Login</Button.Content>
                <Button.Content hidden>
                <Icon name='key' />
                </Button.Content>
              </Button>
            </Link>

            <Button.Or/>

            <Link to='/signup'>
              <Button animated color='blue'>
                <Button.Content visible>Create Account</Button.Content>
                <Button.Content hidden>
                <Icon name='user' />
                </Button.Content>
              </Button>
            </Link>

          </Button.Group>

          <hr/>

        </div>

        <div className='banner-text'>
          <div className='title banner-title'>Mayhem Basketball</div>
          <div className='subtitle banner-subtitle'>Competition Basketball Club</div>
        </div>

        <div style={{marginTop: "20px"}}>

          <Button animated color='blue'>
            <Button.Content visible>Contact</Button.Content>
            <Button.Content hidden>
            <Icon name='info' />
            </Button.Content>
          </Button>

          <Button animated color='blue' href='https://point3basketball.tuosystems.com/stores/mayhem?fbclid=IwAR27i5dCOgglPAdC7OWUJ7Vf98eCu2Z_hhqtrrzihPDiOvNJKNA7jIloQjU' target='_blank'>
            <Button.Content visible>Shop</Button.Content>
            <Button.Content hidden>
            <Icon name='shop' />
            </Button.Content>
          </Button>

        </div>

      </div>
    );
  }
}

export default HomePage;