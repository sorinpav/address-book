import React, {Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/Register';
import Login from './components/pages/Login';

import ContactsState from './context/Contacts/ContactsState';
import AuthState from './context/Authentication/AuthState';
import AlertState from './context/Alert/AlertState';


import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  
  return (
    <AuthState>
    <ContactsState>
      <AlertState>
      <Router>
      <Fragment>
      <Navbar/>
      <div className="container">
        <Alerts/>
        <Switch>
          <PrivateRoute  exact path = '/' component={Home}/>
          <Route exact path ='/about' component={About}/>
          <Route exact path ='/register' component={Register}/>
          <Route exact path ='/login' component={Login}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
      </Fragment>
      </Router>
      </AlertState>
    </ContactsState>
    </AuthState>
  )
}

export default App
