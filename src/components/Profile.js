import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addUser, addBalance } from '../actions';
import api from '../api/api';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import Label_balance from './Label_balance';
import { ADD_BALANCE } from '../actions/actionTypes';

const Profile = (props) => {

  const {
    user
  } = props;

  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(props.balance);

  useEffect(() => {
    setUsers(user);
    console.log(user[0]);
  }, [user]);

  function addBalance(balance) {    
    props.addBalance(balance);
    return { type: ADD_BALANCE, balance }
  }  
  
  useEffect(() => {
    addBalance(balance);
    console.log('balance alterado');
  }, [balance]); 

  async function handleReward(){
    //e.preventDefault();

    const reward = 50;

    const messaging = firebase.messaging();
    const token = await messaging.getToken();
    console.log(token);
    
    const body = JSON.stringify({id: user[0].uid, email: user[0].email, token: token, value: reward});
    const response = await api.post('/reward',body);

    console.log(response.data.balance);
    setBalance(response.data.balance);
  }
  
  return (
    <div className="App">
          {
            user[0]
              ? <Label_balance />
              : <div></div>
          }
          {
            user[0]
              ? <p>Hello, {user[0].displayName}</p>
              : <div></div>
          }
          {
            user[0]
              ? <p>{user[0].email}</p>
              : <div></div>
          } 
          {
            user[0]
              ? <img src={user[0].photoURL} alt = "avatar" height="82" width="82"></img>
              : <div></div>
          }     
          {
            user[0]
              ? <Button variant="outline-light" onClick={handleReward}>Solicitar Reconpensa</Button>
              : <div></div>
          }     
  
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user,
  balance: store.balance
});
 
const mapDispatchToProps= (dispatch)=>{    
  return{
    addUser: (user)=>{dispatch(addUser(user))},
    addBalance: (balance)=>{dispatch(addBalance(balance))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
