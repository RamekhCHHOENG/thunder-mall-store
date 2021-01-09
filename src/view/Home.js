
import React, { Component } from "react";
import { Container, Box } from '@material-ui/core'
import Tabs from './Home/Tab'
export default class Home extends Component {
    render() {
        return (
          <Container>
            <Tabs/>
          </Container>
        );
    }
}