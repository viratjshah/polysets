import React from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import {Steps} from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { ListBox } from 'primereact/listbox';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class AddTokens extends React.Component {  

  constructor(props) {
    super(props);

    this.state = {
      selectedCountries: null,
      activeIndex: 2
    };

    this.countries = [
      { name: 'BTC ETH 75 25 Weight', code: 'AU' },
      { name: 'BTC ETH Equal Weight', code: 'BR' },
      { name: 'BTC ETH 100 Weight', code: 'CN' },
      { name: 'BTC ETH 75 25 Weight', code: 'EG' },
      { name: 'BTC ETH 75 25 Weight', code: 'FR' },
      { name: 'BTC ETH 75 25 Weight', code: 'DE' },
      { name: 'BTC ETH 75 25 Weight', code: 'IN' },
      { name: 'BTC ETH 75 25 Weight', code: 'JP' }
  ];

  this.items = [
    {
        label: 'Create',
        command: (event) => {
            this.toast.show({ severity: 'info', summary: 'Create', detail: event.item.label });
        }
    },
    {
        label: 'Fees',
        command: (event) => {
            this.toast.show({ severity: 'info', summary: 'Fees', detail: event.item.label });
        }
    },
    {
        label: 'Tokens',
        command: (event) => {
            this.toast.show({ severity: 'info', summary: 'Tokens', detail: event.item.label });
        }
    },
    {
        label: 'Customize',
        command: (event) => {
            this.toast.show({ severity: 'info', summary: 'Customize', detail: event.item.label });
        }
    },
    {
      label: 'Publish',
      command: (event) => {
          this.toast.show({ severity: 'info', summary: 'Publish', detail: event.item.label });
      }
  }
];

}

countryTemplate(option) {
  return (
      <div className="country-item">
          <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
          <span>{option.name}</span>
      </div>
  );
}

  render() {
      return (
         <div className="cfund-main">
            <section>
               <div className="steps-demo">
                  <Toast ref={(el) => { this.toast = el }}></Toast>

                  <div className="card">
                     <Steps model={this.items} activeIndex={this.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={false} />
                  </div>
               </div>
            </section>
            <h2 className="p-mt-5">Add Tokens To Your Set</h2>
            <div className='p-field p-col-12 p-md-12'>
            <p>
              You can add or remove tokens later by rebalancing. The more tokens you include
              within your Set, the more gas it will cost for the user to Buy and Sell  your Set.
            </p>
            <div class="alert alert-danger">
              Before proceeding, please review our Set Creation Guide as on all ERC20 token are compatible with the Set Protocol. Incorrectly configuring Set with illiquid or obscure tokens can result in locked funds and lost of network fees.
            </div>
            <div>
                <ListBox value={this.state.selectedCountries} options={this.countries} onChange={(e) => this.setState({ selectedCountries: e.value })} multiple filter optionLabel="name"
                    itemTemplate={this.countryTemplate} style={{  }} listStyle={{ maxHeight: '250px' }} />
            </div>
            <div>
            <table class="table p-mt-5">
              <thead class="thead-light">
                <tr>
                  <th>Tokens</th>
                  <th>Allocation</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    1X short
                  </td>
                  <td>
                       <InputText className='input100' value={this.state.value1} onChange={(e) => this.setState({ value1: e.target.value })} />
                       <Slider value={this.state.value1} onChange={(e) => this.setState({ value1: e.value })} />
                       
                  </td>
                  <td>
                      <Button label="Remove" className="p-button-danger tbtnsm" />
                  </td>
                </tr>
                <tr>
                  <td>
                      1X short
                  </td>
                  <td>
                      <InputText className='input100' value={this.state.value2} onChange={(e) => this.setState({ value2: e.target.value })} />
                      <Slider value={this.state.value2} onChange={(e) => this.setState({ value2: e.value })} />
                      
                  </td>
                  <td>
                      <Button label="Remove" className="p-button-danger tbtnsm" />
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
    
              <Button 
                label='Back'
                onClick={() => {
                  window.location = '/createfpfees';
                }}
                className='p-button p-mt-3 p-component p-button-outlined p-button-secondary p-col-5 p-mt-21'
              />
              <Button
                label='Next'
                onClick={() => {
                  window.location = '/customize';
                }}
                className='p-col-5 p-mt-21 p-ml-1'
              />
            </div>
         </div>
      );
   }  
}  
export default AddTokens; 