import './App.css';
// import Dashboard from './components/Dashboard'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './view/login'
import SignUp from './view/signup'
import NotFound from './view/NotFound/index'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
