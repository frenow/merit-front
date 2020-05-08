import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { GiWallet } from "react-icons/gi";

const Qrcode = (props) => {

      const [state, setState] = useState({
        value: props.match.params.qrcode,
        copied: false,
      });

  return (
    <>
    <div className="container">
    <GiWallet />
    <input value={state.value}
          onChange={({target: {value}}) => setState({value, copied: false})} />

    <CopyToClipboard text={state.value}
          onCopy={() => setState({copied: true})}>
          <Button bsStyle="primary" variant="outline-light">Copy</Button>
    </CopyToClipboard>
    {state.copied ? <span style={{color: 'white'}}>Copied.</span> : null}
    </div>

    </>
  );
};

export default Qrcode;
