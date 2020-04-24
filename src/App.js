import React, { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { compose } from 'redux'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config/firebaseConfig';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
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
import './App.css';
import { ADD_USER } from './actions/actionTypes';
import { addUser } from './actions';
import { FcGoogle } from "react-icons/fc";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = (props) => {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;

  useEffect(() => {
    addUser(user);
  }, [user]); 

  function addUser(user) {    
    props.addUser(user);
    return { type: ADD_USER, user }
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
          </Switch>
          {
            user
              ? <Menu signOut = {signOut}/>
              : <div></div>
          }
          {
            user
              ? <div></div>            
              : <Button bsStyle="primary" variant="outline-light" onClick={signInWithGoogle}><FcGoogle />Sign in with Google</Button>
          }
          {
            user
              ? <div></div>            
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