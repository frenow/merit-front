import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import Label_balance from './Label_balance';

const Saldo = (props) => {

  const {
    user
  } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(user); 
  }, [user]); 

  return (
    <div className="App">
          {
            user[0]
              ? <Label_balance />
              : <div></div>
          }    
  
    </div>
  );
};

const mapStateToProps = store => ({
  user: store.user
});
 
const mapDispatchToProps= (dispatch)=>{    
  return{
    addUser: (user)=>{dispatch(addUser(user))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Saldo);
