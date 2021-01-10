import React, { Component } from 'react'
import { Container, Divider, Button, Grid } from '@material-ui/core';
import CardList from './CardList'

export default class Payment extends Component {
  render() {
    return (
      <>
        <Grid container style={{marginTop: "20px"}}>
          <Grid item xs={6}>
            <h2>Payment Method</h2>
          </Grid>
          <Grid item xs={6} align="right">
            <Button variant="contained" color="secondary">
              Add Card
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <Container maxWidth="sm" mt="20px">
          <CardList/>
        </Container>  
      </>
    )
  }
}

