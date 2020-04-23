import React from "react";
import QRCode from 'qrcode.react';
import { GiWallet } from "react-icons/gi";
import { connect } from 'react-redux';
import { addUser } from '../actions';

const Withdrawal = (props) => {

const {
        user
      } = props;


  const link = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port+"/qrcode?value="+user[0].uid;
  
  return (
    <div className="App">
    <p><GiWallet />{user[0].uid}</p>
    <p>{link}</p>
    <QRCode value={link} />

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
  export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);