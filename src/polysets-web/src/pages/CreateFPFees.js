import React from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//REFER /components/Fees.js
class CreateFPFees extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: 0,
      value2: 50,
      value3: 20,
      value4: 30.5,
      value5: [20, 80],
      value6: 50,
      checked1: false,
      activeIndex: 1,
    };

    this.items = [
      {
        label: 'Create',
        command: (event) => {
          this.toast.show({
            severity: 'info',
            summary: 'Create',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Fees',
        command: (event) => {
          this.toast.show({
            severity: 'info',
            summary: 'Fees',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Tokens',
        command: (event) => {
          this.toast.show({
            severity: 'info',
            summary: 'Tokens',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Customize',
        command: (event) => {
          this.toast.show({
            severity: 'info',
            summary: 'Customize',
            detail: event.item.label,
          });
        },
      },
      {
        label: 'Publish',
        command: (event) => {
          this.toast.show({
            severity: 'info',
            summary: 'Publish',
            detail: event.item.label,
          });
        },
      },
    ];
  }

  render() {
    return (
      <div className='cfund-main'>
        <section>
          <div className='steps-demo'>
            <Toast
              ref={(el) => {
                this.toast = el;
              }}></Toast>

            <div className='card'>
              <Steps
                model={this.items}
                activeIndex={this.state.activeIndex}
                onSelect={(e) => this.setState({ activeIndex: e.index })}
                readOnly={false}
              />
            </div>
          </div>
        </section>
        <h2 className='p-mt-5'>Add Fees Details</h2>
        <div className='p-field p-col-10 p-md-10'>
          <p>
            Basic details such as name and symbol are written to the blockchain
            and cannot be update later. Once created, you can customize your
            Set's description, the manager description, and provide image icons.
          </p>
          <h6>Entry Fee</h6>
          <p>
            Entry Fee is the fee you will charge your investor when they invest
            in your fund.
            <br />
            This fee is a % of amount invested
          </p>
          <p>
            <InputNumber
              className='input100'
              mode='decimal'
              min={0}
              max={100}
              step={0.01}
              minFractionDigits={2}
              maxFracionDigits={3}
              value={this.state.value1}
              onValueChange={(e) => this.setState({ value1: e.target.value })}
            />
            <Slider
              value={this.state.value1}
              step={0.01}
              onChange={(e) => this.setState({ value1: e.value })}
            />
          </p>
          <h6>Exit Fee</h6>
          <p>
            Exit Fee is the fee you will charge your investor when they sell
            your fund.
            <br />
            This fee is a % of amount invested
          </p>
          <p>
            <InputNumber
              className='input100'
              mode='decimal'
              min={0}
              max={100}
              step={0.01}
              minFractionDigits={2}
              maxFracionDigits={3}
              value={this.state.value2}
              onValueChange={(e) => this.setState({ value2: e.target.value })}
            />
            <Slider
              value={this.state.value2}
              step={0.01}
              onChange={(e) => this.setState({ value2: e.value })}
            />
          </p>
          <h6>Rebalance Fee</h6>
          <p>
            Rebalance Fee is the fee you will charge your investor when you
            rebalance your.
            <br />
            fund. This fee is a % total value of fund accured every time the
            postfolio is <br />
            rebalanced. The accures fees can be claimed periodically.
          </p>
          <p>
            <InputNumber
              className='input100'
              mode='decimal'
              min={0}
              max={100}
              step={0.01}
              minFractionDigits={2}
              maxFracionDigits={3}
              value={this.state.value3}
              onValueChange={(e) => this.setState({ value3: e.target.value })}
            />
            <Slider
              value={this.state.value3}
              step={0.01}
              onChange={(e) => this.setState({ value3: e.value })}
            />
          </p>
          <h6>Management Fee</h6>
          <p>
            Rebalance Fee is the fee you will charge your investor when you
            rebalance your.
            <br />
            fund. This fee is a % total value of fund accured every time the
            postfolio is <br />
            rebalanced. The accures fees can be claimed periodically.
          </p>
          <p>
            <InputNumber
              className='input100'
              mode='decimal'
              min={0}
              max={100}
              step={0.01}
              minFractionDigits={2}
              maxFracionDigits={3}
              value={this.state.value4}
              onValueChange={(e) => this.setState({ value4: e.target.value })}
            />
            <Slider
              value={this.state.value4}
              step={0.01}
              onChange={(e) => this.setState({ value4: e.value })}
            />
          </p>
          <h6>Mining Fee</h6>
          <p>
            This fee charge to the investor when new Fund tokens are issued
            <br />
            This is the acutal mining fee and is passed on to the investor
          </p>
          <p>
            <ToggleButton
              checked={this.state.checked1}
              onChange={(e) => this.setState({ checked1: e.value })}
              onIcon='pi pi-check'
              offIcon='pi pi-times'
            />
          </p>
          <Button
            label='Back'
            onClick={() => {
              window.location = '/createfpfees';
            }}
            className='p-button p-component p-button-outlined p-button-secondary p-col-5 p-mt-21'
          />
          <Button
            label='Continue'
            onClick={() => {
              window.location = '/addtokens';
            }}
            className='btncont p-col-5 p-mt-21 p-ml-1'
            id='btncont'
          />
        </div>
      </div>
    );
  }
}
export default CreateFPFees;
