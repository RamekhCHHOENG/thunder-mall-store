
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Container, Box, Button, TextField} from '@material-ui/core'
import fire from '../../fire'
import { Link } from 'react-router-dom'
// import { AuthContext } from "../Auth"

const Login = ({ history }) => {
  // const { currentUser, userData } = useContext(AuthContext);
  const handleForgotPassword = useCallback(
    async event => {
      event.preventDefault();
      const { email } = event.target.elements;
      try {
        await fire
          .auth()
          .sendPasswordResetEmail(email.value);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  
  // if (currentUser) {
  //   return <Redirect to="/" />;
  // }

  return (
    <Container maxWidth="sm">
      <Box mt="40px">
      <Link to="/login">
          <span>Back To Login</span>
        </Link>
        <form onSubmit={handleForgotPassword}>
            <h3>Reset Password</h3>
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
              <Button
                align="center"
                variant="contained" 
                color="secondary"
                type="submit"
                >Reset Password
              </Button>
        </form>
      </Box>
    </Container>
  );
}

export default withRouter(Login);