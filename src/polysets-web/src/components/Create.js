import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';

const Create = (props) => {
  const [fund, setFund] = useState(null);

  console.log(props);
  return (
    <div>
      <h2 className='p-mt-5'>Add Details</h2>
      <p>
        Basic details such as name and symbol are written to the blockchain and cannot be update later. 
        <br/> Once created, you can customize your Set's description, the manager description, and provide image icons.
      </p>
      <h6>Create a name of your Set</h6>
      <p>
        Great Set names are unique, short and easy to remember. 
        <br/> They must be 32 characters or less.
      </p>
      <p>
        <InputText
          className='p-col-12 cfptextbox'
          id='setname'
          value={props.state.createName}
          onChange={(e) => props.onChange({ createName: e.target.value })}
          placeholder='e.g Ethereum Volatility Index'
          type='text'
        />
      </p>
      <h6>Create a symbol for your Set</h6>
      <p>
        Symbols are a 3 to 5 character name to represent your trading pool, 
        <br/> e.g.ETH or BTC.
      </p>
      <p>
        <InputText
          className='p-col-12 cfptextbox'
          id='setsymbol'
          value={props.state.createSymbol}
          onChange={(e) => props.onChange({ createSymbol: e.target.value.toUpperCase() })}
          placeholder='EVOLI'
          type='text'
        />
      </p>
      <h6>Select a starting price</h6>
      <p>
        This will be the starting price of your Set in USD once its been created.
      </p>
      <p>
        <InputNumber
          className='p-col-12 cfptextbox cfund-inputtext1'
          id='setstrprice'
          mode='currency'
          currency='USD'
          locale='en-US'
          value={props.state.createStartingPrice}
          onValueChange={(e) =>
            props.onChange({ createStartingPrice: e.target.value })
          }
          placeholder='100'
          type='text'
        />
      </p>
      <h6>Fund Type</h6>
      <p>This will let your investors know how the fund will be managed.</p>

      <div className='p-field p-col-12 p-md-12'>
        <ul class="donate-now">
          <li className="p-field-radiobutton mr13">
            <RadioButton inputId="passivefund" name="fund" value="Passive Fund" onChange={(e) => setFund(e.value)} checked={fund === 'Passive Fund'} />
            <label htmlFor="passivefund" className='p-button p-button-info'>Passive Fund</label>
          </li>
          <li className="p-field-radiobutton mr13">
            <RadioButton inputId="activefund" name="fund" value="Active Fund" onChange={(e) => setFund(e.value)} checked={fund === 'Active Fund'} />
            <label htmlFor="activefund" className='p-button p-button-success'>Active Fund</label>
          </li>
          <li className="p-field-radiobutton">
            <RadioButton inputId="quantfund" name="fund" value="Quant Fund" onChange={(e) => setFund(e.value)} checked={fund === 'Quant Fund'} />
            <label htmlFor="quantfund" className='p-button p-button-warning'>Quant Fund</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Create;