import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './view/login'
import SignUp from './view/signup'
import Dashboard from './components/Dashboard'
import React from 'react'
import { AuthProvider } from './Auth'
import PrivateRoute from "./PrivateRoute"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
