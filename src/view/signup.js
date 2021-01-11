import React, { Component } from "react";
import { 
    Container,
    Box,
    Button,
    TextField }
from '@material-ui/core'
import { Link } from 'react-router-dom'

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

                <Link to="/login">
                <Button
                    align="center"
                    variant="contained" 
                    color="secondary"
                    >Submit
                </Button>
                </Link>
                  <p className="forgot-password text-right">
                      Already registered? <Link to="/login"> Sign In</Link>
                  </p>
              </form>
            </Box>
          </Container>
        );
    }
}