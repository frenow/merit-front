import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import { Form, Button } from 'react-bootstrap';
import api from '../api/api';
import { Table } from 'react-bootstrap';
import { BsGraphUp } from "react-icons/bs";

const Deposit = (props) => {

const {
        user
      } = props;

const [state, setState] = useState({
        error: null,
        isLoaded: false,
        items: []
      });
  const [idDestination, setIdDestination] = useState("");
  const [qtd, setQtd] = useState(50);
  const [deposited, setDeposited] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    deposit();
}

useEffect(() => {
  
}, [deposited]); 

async function deposit() {

  const messaging = firebase.messaging();
  const token = await messaging.getToken();
  console.log(token);
  
  const body = JSON.stringify({id_origin: user[0].uid, id_destination: idDestination, email: user[0].email, token: token, value: qtd});
  const response = await api.post('/deposit',body);

  console.log(response.data);
  if (response.data.message == 'Success') {
    setDeposited("Depósito feito com sucesso."); 
    find_history();
  }
  if (response.data.message == 'Failure') {
    setDeposited("Saldo insuficiente."); 
  }
  if (response.data.message == 'Notfound') {
    setDeposited("Id da wallet destino nao encontrada."); 
  }
}

useEffect(() => {
  find_history();
  console.log(state.items);
}, [state.isLoaded]); 

async function find_history() {    
  const response = await api.get('/history_deposit/'+user[0].uid);
  setState({isLoaded: true, items: response.data.history});
} 

  return (
    <div className="container">
    <div className="form-group">
    <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasic">
    <Form.Label>Id da wallet destino:</Form.Label>    
    <input
          type="text"
          id="wallet"
          name="wallet"
          required
          placeholder="Enter wallet id"
          value={idDestination}
          onChange={e => setIdDestination(e.target.value)}
        />
        <br />
      <label>
        Quantidade:
        <input
          type="text"
          id="qtd"
          name="qtd"
          required
          min="1"
          size="4"
          value={qtd}
          onChange={e => setQtd(e.target.value)}
        />
      </label>
      <br />
      <Button variant="primary" type="submit">Enviar</Button>
      </Form.Group>
    </Form>
      {deposited && (<p>{deposited}</p>)}
    </div>
    <h2><BsGraphUp />Histórico de Depósitos</h2>
    <Table striped bordered hover variant="dark">
    <thead>
        <tr>
            <th>Data</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Obs</th>
            <th>Valor</th>
        </tr>
    </thead>
    <tbody>
        {
          state.items.map(function(item){
              return (
                <tr>
                <td>{item.date}</td>
                <td>{item.origin}</td>
                <td>{item.destination}</td>
                <td>{item.note}</td>
                <td>{item.value}</td>
              </tr>
              ) 
          })
        }
    </tbody>
    </Table> 
    <style jsx>{`
      .container {
        margin-top: 65px;
        font-size:18px; 
      }  
      `}</style>    

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
  export default connect(mapStateToProps, mapDispatchToProps)(Deposit);