
import React, { Component } from "react";
import { Container, Box } from '@material-ui/core'

export default class Category extends Component {
    render() {
        return (
          <Container maxWidth="sm">
            <Box mt="40px">
              <div>This is category content</div>
            </Box>
          </Container>
        );
    }
}