
import React, { Component } from "react";
import { Button } from 'react-bootstrap';

export default class Login extends Component {
    render() {
        return (
          <>
          <div className="container mt-4">
            <span className="center">Page not found Please go back to home screen</span> <br/>
            <Button variant="primary" className="mt-4 pa-4">Go Back</Button>
          </div>
        </>
        );
    }
}