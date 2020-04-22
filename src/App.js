import React, { useState, useEffect } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { bindActionCreators, compose } from 'redux'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './config/firebaseConfig';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Store } from './store';
import Sobre from "./components/Sobre";
import Menu from "./components/Menu";
import Saldo from "./components/Saldo";
import Profile from "./components/Profile";
import Home from "./components/Home";
import './App.css';
import { ADD_USER } from './actions/actionTypes';
import { addUser } from './actions';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const App = (props) => {
  const {
    user,
    signOut,
    signInWithGoogle,
  } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(user); 
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
            <Route exact path="/Saldo" component={Saldo} />
            <Route exact path="/Sobre" component={Sobre} />
          </Switch>
          {
            user
              ? <Menu signOut = {signOut}/>
              : <div></div>
          }
          {
            user
              ? <div></div>
              : <p>Please sign in.</p>
          }
          {
            user
              ? <div></div>            
              : <Button bsStyle="primary" onClick={signInWithGoogle}>Sign in with Google</Button>
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