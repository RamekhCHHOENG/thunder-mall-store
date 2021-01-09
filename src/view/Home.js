import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container } from '@material-ui/core';
import { CreditCard } from '@material-ui/icons';


export class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: 0
    }
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  };

  render() {
    return (
      <Container maxWidth="md" fixed>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
            <Tab label="Item One" icon={<CreditCard />}/>
          </Tabs>
        </AppBar>
      </Container>
    );
  }
}

export default Home
