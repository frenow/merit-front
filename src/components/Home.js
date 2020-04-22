import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Table } from 'react-bootstrap';

const Home = (props) => {

  const {
    user
  } = props;

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
    const response = await api.get('/history');
    setState({isLoaded: true, items: response.data.history});
  }

  return (
    <div>
    <h1>Como podemos usar estruturas de bônus que podem realmente incentivar a motivação intrínseca?</h1>
    <p>Normalmente, os bônus são alocados por classificações de desempenho, cargo ou função, salário, horas extras ou outra variável, cada uma pior que a anterior. Décadas de pesquisa confirmaram repetidas vezes que os sistemas de bônus tradicionais raramente têm um efeito positivo no desempenho das pessoas quando estão envolvidas no trabalho criativo do conhecimento. No que diz respeito a um sistema de remuneração fixa, ele não enfrenta o desafio de pagar aos funcionários o que eles realmente ganham.</p>
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

export default (Home);