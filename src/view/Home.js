import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, Box, Avatar, Typography } from '@material-ui/core';
import BannerSlider from './Home/BannerSlider'


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
      <Container maxWidth="lg" fixed>
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
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
            <Tab icon={<CategoryTab/>}/>
          </Tabs>
          <BannerSlider Images={[{ image: "Google Image"}]}/>
        </AppBar>
      </Container>
    );
  }
}

export const CategoryTab = () => {
    return <Box>
      <Avatar
        alt="Remy Sharp"
        variant="square"
        src="/static/images/avatar/1.jpg" />
        <Typography variant="body2">Title</Typography>
    </Box>
}
export default Home
