import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { Table } from 'react-bootstrap';
import { BsGraphUp } from "react-icons/bs";
import { IoLogoBitcoin } from "react-icons/io";

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
  }, [state.isLoaded]); 

  async function find_history() {    
    const response = await api.get('/history');
    setState({isLoaded: true, items: response.data.history});
  }

  return (
    <>
    <div>
    <div className="container">
    <h1>Sistema de Recompensa <IoLogoBitcoin />Merit</h1>
    <h3>Modelo de sistema de bonificação e recompensa colaborativo e contínuo que incentiva o 
apoio e o reconhecimento do trabalho de seus companheiros de acordo com seus próprios critérios.</h3>
    <h3>Como podemos usar estruturas de bônus que podem realmente incentivar a motivação intrínseca?</h3>
    <p>Como podemos incentivar o desempenho? Como podemos recompensar as pessoas pelo trabalho que fizeram? Mais importante, como aumentamos a motivação intrínseca, em vez da motivação extrínseca mais confiável que desaparece rapidamente.</p>
    <img src="https://1qjpt15fhlq3xjfpm2utibj1-wpengine.netdna-ssl.com/wp-content/themes/m30/images/m30-logo.png" alt="Merit" height="90" width="90"></img>
    <h3>Metodologia <a href="https://management30.com/practice/merit-money/">Merit Money</a></h3>
    </div>
    <h2><BsGraphUp />Histórico de Movimentações</h2>
    <Table striped bordered hover size="sm" variant="dark">
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
        padding: 18px 18px 24px;
        width: 800px;
        text-align: left;
        text-decoration: none;
        background-color: #0275d8
      }
      p {
        text-align: justify;
        text-justify: inter-word;
        font-size:18px; 
      }
      h1 {
        text-align: center;
      }
      `}</style>    
    </div>
    </>
  );
};

export default (Home);