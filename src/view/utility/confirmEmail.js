import React from "react";
import { Container, Box, Button, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom'

const VerifyEmailSent = () => {
  return (
    <Container maxWidth="sm" center>
      <Box mt="40px">
        <Typography variant="subtitle1">We have send you the verification email.
              <br/> 
              Please verify your email and login again
        </Typography>
        <Link to="/login">
          <Button variant="contained" color="secondary">Back to Login</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default VerifyEmailSent