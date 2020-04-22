import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../actions';
import Label_balance from './Label_balance';
import api from '../api/api';
import { Table } from 'react-bootstrap';

const Saldo = (props) => {

  const {
    user
  } = props;

  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    error: null,
    isLoaded: false,
    items: []
  });

  useEffect(() => {
    find_history();
    console.log(state.items);
  }, [state.isLoaded]); 

  async function find_history() {    
    const response = await api.get('/history/'+user[0].uid);
    setState({isLoaded: true, items: response.data.history});
  } 

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
    <h2>Historico de Movimentacoes</h2>
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
