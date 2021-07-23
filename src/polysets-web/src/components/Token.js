import React from 'react';
import 'primeflex/primeflex.css';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {Steps} from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { ListBox } from 'primereact/listbox';

const Token = (props) => {

    const tokens = [
        { name: 'BTC ETH 75 25 Weight', code: 'AU' },
        { name: 'BTC ETH Equal Weight', code: 'BR' },
        { name: 'BTC ETH 100 Weight', code: 'CN' },
        { name: 'BTC ETH 75 25 Weight', code: 'EG' },
        { name: 'BTC ETH 75 25 Weight', code: 'FR' },
        { name: 'BTC ETH 75 25 Weight', code: 'DE' },
        { name: 'BTC ETH 75 25 Weight', code: 'IN' },
        { name: 'BTC ETH 75 25 Weight', code: 'JP' }
    ];

    function countryTemplate(option) {
        return (
            <div className="country-item">
                <img alt={option.name} src="showcase/demo/images/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                <span>{option.name}</span>
            </div>
        );
    }
    return (
        <div>
        <h2 className="p-mt-5">Add Tokens To Your Set</h2>
        <div className='p-field p-col-12 p-md-12 p0'>
          <p>
            You can add or remove tokens later by rebalancing. The more tokens you include
            within your Set, the more gas it will cost for the user to Buy and Sell  your Set.
          </p>
          <div class="alert alert-danger">
            Before proceeding, please review our Set Creation Guide as on all ERC20 token are compatible with the Set Protocol. Incorrectly configuring Set with illiquid or obscure tokens can result in locked funds and lost of network fees.
          </div>
          <div>
              <ListBox value={props.state.selectedCountries} options={tokens} onChange={(e) => props.onChange({ selectedCountries: e.value })} multiple filter optionLabel="name"
                  itemTemplate={countryTemplate} style={{  }} listStyle={{ maxHeight: '250px' }} />
          </div>
          <section className="p-mt-4">
            <div className="p-grid gridheader">
              <div className="p-col-4"><strong>Tokens</strong></div>
              <div className="p-col-6 textleft"><strong>Allocation</strong></div>
            </div>
            <div className="p-grid">
              <div className="p-col">1X short</div>
              <div className="p-col">
                <InputText className='input100' value={props.state.value1} onChange={(e) => props.onChange({ value1: e.target.value })} />
                <Slider value={props.state.value1} onChange={(e) => props.onChange({ value1: e.value })} />                
              </div>
              <div className="p-col text-right">
                <Button label="Remove" className="p-button-danger tbtnsm" />
              </div>
            </div>
            <div className="p-grid">
              <div className="p-col">1X short</div>
              <div className="p-col">
                <InputText className='input100' value={props.state.value2} onChange={(e) => props.onChange({ value2: e.target.value })} />
                <Slider value={props.state.value2} onChange={(e) => props.onChange({ value2: e.value })} />                
              </div>
              <div className="p-col text-right">
                <Button label="Remove" className="p-button-danger tbtnsm" />
              </div>
            </div>            
          </section>
        </div>
     </div>
    )
}
export default Token;