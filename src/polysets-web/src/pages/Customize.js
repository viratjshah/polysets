import React from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import {Steps} from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { ListBox } from 'primereact/listbox';
import { Editor } from 'primereact/editor';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Customize extends React.Component {  

  constructor(props) {
    super(props);

    this.state = {
      selectedCountries: null,
      activeIndex: 3
    };

    
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
            <h2 className="p-mt-5">Customize</h2>
            <div className='p-field p-col-12 p-md-12'>
            <div>
                <h5>Fund Creator</h5>
                <InputText value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
                <span className="p-ml-2">{this.state.value1}</span>
            </div>
            <div className="p-mt-3">
                <h5>Fund Logo</h5>
                <h5>Description</h5>
                <Editor style={{height:'320px'}}  />
            </div>
    
              <Button 
                label='Back'
                onClick={() => {
                  window.location = '/addtokens';
                }}
                className='p-button p-mt-3 p-component p-button-outlined p-button-secondary p-col-5 p-mt-21'
              />
              <Button
                label='Next'
                onClick={() => {
                  window.location = '/home';
                }}
                className='p-col-5 p-mt-21 p-ml-1'
              />
            </div>
         </div>
      );
   }  
}  
export default Customize; 