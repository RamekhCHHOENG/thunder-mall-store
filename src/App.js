import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './view/login'
import SignUp from './view/signup'
import ComfirmEmail from './view/utility/confirmEmail'
import ForgotPassword from './view/utility/forgotPassword'
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
          <Route exact path="/emailverify" component={ComfirmEmail} />  
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/categories" component={Dashboard} />
          <Route exact path="/products" component={Dashboard} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
