import React, { useState } from "react";
import { GiWallet } from "react-icons/gi";
import { connect } from 'react-redux';
import { addUser } from '../actions';
import { Form, Button } from 'react-bootstrap';

const Deposit = (props) => {

const {
        user
      } = props;


  const [idDestination, setIdDestination] = useState("");
  const [qtd, setQtd] = useState(50);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting Name ${idDestination}`)
}

  return (
    <div>
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
          max="100"
          size="4"
          value={qtd}
          onChange={e => setQtd(e.target.value)}
        />
      </label>
      <br />
      <Button variant="primary" type="submit">Enviar</Button>
      </Form.Group>
    </Form>
    </div>
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