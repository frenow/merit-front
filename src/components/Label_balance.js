import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ADD_BALANCE } from '../actions/actionTypes';
import { addUser, addBalance } from '../actions';
import api from '../api/api';
import * as firebase from 'firebase';


const Label_balance = (props) => {
    const {
        user
      } = props;

    const [balance, setBalance] = useState(props.balance);

      useEffect(() => {
        find_balance();  
        addBalance(balance);
        console.log('balance alterado');
      }, [balance]); 
      
      
      function addBalance(balance) {    
        props.addBalance(balance);
        return { type: ADD_BALANCE, balance }
      }    

      async function find_balance() {

        const messaging = firebase.messaging();
        const token = await messaging.getToken();
        console.log(token);
        
        const response = await api.get('/balance/'+user[0].uid);
    
        console.log(response.data.balance);
        setBalance(response.data.balance);    
      }

  return (
    <div className="App">

    <p>SALDO ${props.balance}</p>

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
  export default connect(mapStateToProps, mapDispatchToProps)(Label_balance);