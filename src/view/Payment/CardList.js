import React from 'react';
import Card from '@material-ui/core/Card';
import { Button, Grid, IconButton } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { Create, Delete } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

var cardStyle = {
  marginTop: '20px',
  paddingTop: '50px'
}

export default function SimpleCard() {
  return (
    <>
    <Card style={cardStyle}>
      <CardContent pt="30px">
        <Typography variant="h6">
          XXXX XXXX 87989 5998
        </Typography>
        <Typography>
          Expired 11/2021
        </Typography>

        <Grid container justify="flex-end"> 
          <IconButton>
            <Create />
        </IconButton>
          <IconButton>
            <Delete style={{color: "#e31721"}}/>
        </IconButton>
        </Grid>
      </CardContent>
    </Card>
    <Card style={cardStyle}>
      <CardContent pt="30px">
        <Typography variant="h6">
          XXXX XXXX 99994 9798
        </Typography>
        <Typography>
          Expired 04/2021
        </Typography>

        <Grid container justify="flex-end"> 
          <IconButton>
            <Create />
        </IconButton>
          <IconButton>
            <Delete style={{color: "#e31721"}}/>
        </IconButton>
        </Grid>
      </CardContent>
    </Card>
    <Card style={cardStyle}>
      <CardContent pt="30px">
        <Typography variant="h6">
          XXXX XXXX 87989 93443
        </Typography>
        <Typography>
          Expired 09/2021
        </Typography>

        <Grid container justify="flex-end"> 
          <IconButton>
            <Create />
        </IconButton>
          <IconButton>
            <Delete style={{color: "#e31721"}}/>
        </IconButton>
        </Grid>
      </CardContent>
    </Card>
    <Card style={cardStyle}>
      <CardContent pt="30px">
        <Typography variant="h6">
          XXXX XXXX 93435 9998
        </Typography>
        <Typography>
          Expired 10/2021
        </Typography>

        <Grid container justify="flex-end"> 
          <IconButton>
            <Create />
        </IconButton>
          <IconButton>
            <Delete style={{color: "#e31721"}}/>
        </IconButton>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
}
