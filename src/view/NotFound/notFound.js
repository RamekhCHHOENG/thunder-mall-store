import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button
} from '@material-ui/core';


const notFound = () => {

  return (
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        mt="100px"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h4"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Typography align="center" mt="20px">
            <Button
              align="center"
              variant="contained" 
              color="secondary"
              >Go Back
            </Button>
          </Typography>
        </Container>
      </Box>
  );
};

export default notFound