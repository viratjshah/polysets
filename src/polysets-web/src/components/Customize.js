import React from 'react';
import 'primeflex/primeflex.css';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {Steps} from 'primereact/steps';
import { ListBox } from 'primereact/listbox';
import { Editor } from 'primereact/editor';

const Customize = (props) => {
    return (
         <div>
            <section>
               <div className="steps-demo">
                  <div className="card">
                     <Steps model={props.items} activeIndex={props.state.activeIndex} onSelect={(e) => this.setState({ activeIndex: e.index })} readOnly={false} />
                  </div>
               </div>
            </section>
            <h2 className="p-mt-5">Customize</h2>
            <div className='p-field p-col-12 p-md-12'>
            <div>
                <h5>Fund Creator</h5>
                <InputText value={props.state.value1} onChange={(e) => props.setState({value1: e.target.value})} />
                <span className="p-ml-2">{props.state.value1}</span>
            </div>
            <div className="p-mt-3">
                <h5>Fund Logo</h5>
                <h5>Description</h5>
                <Editor style={{height:'320px'}}  />
            </div>
            </div>
         </div>
    )
}
export default Customize;