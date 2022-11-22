import React, { useCallback } from "react";
import { 
    Container,
    Box,
    Button,
    TextField }
from '@material-ui/core'
import { Link } from 'react-router-dom'
import fire from '../fire'
import { withRouter } from "react-router"
// import { AuthContext } from "../Auth"

const SignUp = ({history}) => {
  // const { userData } = useContext(AuthContext);
  const handleSignUp = useCallback( async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await fire
        .auth() 
        .createUserWithEmailAndPassword(email.value, password.value);
        // if(!userData.emailVerified) {
        //   alert('we have send u the verified email')
        //   var user = fire.auth().currentUser
        //   user.sendEmailVerification()
        //   history.push('/emailverify')
        // } else {
        //   history.push("/");
        // }
        history.push("/");
      } catch(error) {
        alert(error)
      }
    }, [history]
  );
  return (
    <Container maxWidth="sm">
      <Box mt={10} >
        <form p={20} onSubmit={handleSignUp}>
            <h3>Sign Up</h3>
              <TextField
                  label="First Name"
                  id="outlined-size-small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  type="text"
                  name="firstname"
              />
              <TextField
                  label="Last Name"
                  id="outlined-size-small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  type="text"
                  name="lastname"
              />
              <TextField
                  label="Email"
                  id="outlined-size-small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  type="email"
                  name="email"
              />
              <TextField
                  label="Password"
                  id="outlined-size-small"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  type="password"
                  name="password"
              />
          <Button
              align="center"
              variant="contained" 
              color="secondary"
              type="submit"
              >Submit
          </Button>
            <p className="forgot-password text-right">
                Already registered? <Link to="/login"> Sign In</Link>
            </p>
        </form>
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);