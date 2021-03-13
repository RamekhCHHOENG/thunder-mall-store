
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Container, Box, Button, TextField} from '@material-ui/core'
import { Link } from 'react-router-dom'
import fire from '../fire'
import { AuthContext } from "../Auth"

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      alert(email.value, password.value, 'here is email password')
      try {
        await fire
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
          alert("your are sign in")
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="sm">
      <Box mt="40px">
        <form onSubmit={handleLogin}>
            <h3>Sign In</h3>
            <TextField
                  label="Email"
                  id="outlined-size-small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  name="email"
                  type="email"
              />
            <TextField
                  label="Password"
                  id="outlined-size-small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  name="password"
              />


            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>
              <Button
                align="center"
                variant="contained" 
                color="secondary"
                type="submit"
                >Sign In
              </Button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
        <Link to="/signup">
          <span>Don't have account?</span>
        </Link>
      </Box>
    </Container>
  );
}

export default withRouter(Login);