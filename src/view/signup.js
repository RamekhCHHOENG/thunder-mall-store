import React, { Component } from "react";
import { 
    Container,
    Box,
    Button,
    TextField }
from '@material-ui/core'

export default class SignUp extends Component {
    render() {
        return (
          <Container maxWidth="sm">
            <Box mt={10} >
              <form p={20}>
                  <h3>Sign Up</h3>
                    <TextField
                        label="First Name"
                        id="outlined-size-small"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                    />
                    <TextField
                        label="Last Name"
                        id="outlined-size-small"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                    />
                    <TextField
                        label="Email"
                        id="outlined-size-small"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                    />
                    <TextField
                        label="Password"
                        id="outlined-size-small"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        margin="normal"
                    >Sign Up</Button>
                  <p className="forgot-password text-right">
                      Already registered <a href="#">sign in?</a>
                  </p>
              </form>
            </Box>
          </Container>
        );
    }
}