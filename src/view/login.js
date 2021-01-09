
import React, { Component } from "react";
import { Container, Box, Button, TextField} from '@material-ui/core'

export default class Login extends Component {
    render() {
        return (
          <Container maxWidth="sm">
            <Box mt="40px">
              <form>
                  <h3>Sign In</h3>
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


                  <div className="form-group">
                      <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck1" />
                          <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                      </div>
                  </div>

                  <Button variant="contained" color="secondary">Sign In</Button>
                  <p className="forgot-password text-right">
                      Forgot <a href="#">password?</a>
                  </p>
              </form>

              <a href="">Don't have account?</a>
            </Box>
          </Container>
        );
    }
}