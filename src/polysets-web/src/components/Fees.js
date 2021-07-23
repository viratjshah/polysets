import React from 'react';
import 'primeflex/primeflex.css';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { ToggleButton } from 'primereact/togglebutton';


const Fees = (props) => {
  return (
    <div>
      <h2 className='p-mt-5'>Add Fees Details</h2>
      <div className='p-field p-col-10 p-md-10'>
        <p>
          Basic details such as name and symbol are written to the blockchain
          and cannot be update later. Once created, you can customize your Set's
          description, the manager description, and provide image icons.
        </p>
        <h6>Entry Fee</h6>
        <p>
          Entry Fee is the fee you will charge your investor when they invest in
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
            value={props.state.feesEntry}
            onValueChange={(e) => props.onChange({ feesEntry: e.target.value })}
          />
          <Slider
            value={props.state.feesEntry}
            step={0.01}
            onChange={(e) => props.onChange({ feesEntry: e.value })}
          />
        </p>
        <h6>Exit Fee</h6>
        <p>
          Exit Fee is the fee you will charge your investor when they sell your
          fund.
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
            value={props.state.feesExit}
            onValueChange={(e) => props.onChange({feesExit: e.target.value})}
          />
          <Slider
            value={props.state.feesExit}
            step={0.01}
            onChange={(e) => props.onChange({feesExit: e.value})}
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
            value={props.state.feesRebalancing}
            onValueChange={(e) =>
              props.onChange({feesRebalancing: e.target.value})
            }
          />
          <Slider
            value={props.state.feesRebalancing}
            step={0.01}
            onChange={(e) => props.onChange({feesRebalancing: e.value})}
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
            value={props.state.feesManagement}
            onValueChange={(e) =>
              props.onChange({feesManagement:e.target.value})
            }
          />
          <Slider
            value={props.state.feesManagement}
            step={0.01}
            onChange={(e) => props.onChange({feesManagement: e.value})}
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
            checked={props.state.feesMining}
            onChange={() => props.onChange({feesMining:!props.state.feesMining})}
            onIcon='pi pi-check'
            offIcon='pi pi-times'
          />
        </p>
      </div>
    </div>
  );
}
export default Fees; 