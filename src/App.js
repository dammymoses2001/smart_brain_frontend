import React, { useContext, useEffect } from 'react';
import Login from './containers/Login';
import Register from './containers/Register';
import Index from './containers/Index';
import UserProfile from './containers/UserProfile';
import ProtectedRouter from './auth/ProtectRouter'
import { Route, Switch } from 'react-router-dom';
import Particles from 'react-particles-js';
import { particles } from './components/particle';
import Error from './containers/Error'
import 'bootstrap/dist/css/bootstrap.css';
import 'tachyons';
import './App.css';

import { SmartBrainContext } from './contextApi'

function App() {
  const context = useContext(SmartBrainContext)
  const { loggedIn, isUserloggedIn } = context
  //console.log(loggedIn)
  useEffect(() => {
    if (!loggedIn) {
      // console.log('hate')
      isUserloggedIn()
    }
  }, [isUserloggedIn, loggedIn])



  return (
    <div className='App'>
      <Particles params={particles} className='particles' />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <ProtectedRouter exact path='/' component={Index} />
        <ProtectedRouter exact path='/userprofile' component={UserProfile} />
        <Route exact component={Error} />
      </Switch>

    </div>

  );
}

export default App;
