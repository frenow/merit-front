import React, { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { compose } from 'redux'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config/firebaseConfig';
import { BrowserRouter, Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Store } from './store';
import About from "./components/About";
import Menu from "./components/Menu";
import Balance from "./components/Balance";
import Deposit from "./components/Deposit";
import Withdrawal from "./components/Withdrawal";
import Reward from "./components/Reward";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Qrcode from "./components/Qrcode";
import './App.css';
import { ADD_USER } from './actions/actionTypes';
import { addUser } from './actions';
import { FcGoogle } from "react-icons/fc";
import { askForPermissioToReceiveNotifications } from './push-notification';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = (props) => {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;

  const history = useHistory();
  
  useEffect(() => {
    addUser(user);
  }, [user]); 

  function addUser(user) {    
    props.addUser(user);
    return { type: ADD_USER, user }
  }  

  const redirect = () => {
    signInWithGoogle();
    askForPermissioToReceiveNotifications();
    history.push("/Profile");
  }

    return (
      <Provider store={Store}>
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
        <Switch>
            <Route exact path="/" component={Profile} />
            <Route exact path="/Profile" component={Profile} />
            <Route exact path="/Balance" component={Balance} />
            <Route exact path="/Deposit" component={Deposit} />
            <Route exact path="/Withdrawal" component={Withdrawal} />
            <Route exact path="/Reward" component={Reward} />
            <Route exact path="/About" component={About} />
            <Route exact path="/:qrcode" component={Qrcode} />
          </Switch>
          {
            user
              ? <Menu signOut = {signOut}/>
              : <></>
          }          
          {
            user
              ? <></>            
              : <Button bsStyle="primary" onClick={redirect}><FcGoogle />Sign in with Google</Button>
          }
          {
            user
              ? <></>            
              : <Home />
          }
        </header>
      </div>
      </BrowserRouter>
      </Provider>
    );
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const mapStateToProps = store => ({
  user: store.user
});

const mapDispatchToProps= (dispatch)=>{
  return{
    addUser: (user)=>{dispatch(addUser(user))},
  }
}

export default compose(
          connect(
            mapStateToProps,
            mapDispatchToProps
          ),
          withRouter, 
          withFirebaseAuth({providers,firebaseAppAuth,}),
)(App)