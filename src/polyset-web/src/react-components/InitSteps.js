import React from 'react';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Steps } from 'primereact/steps';
import Fees from '../components/Fees';
import Token from '../components/Token';
import Customize from '../components/Customize';
import Publish from '../components/Publish';
import Create from '../components/Create';

class InitSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      createName:'',
      createSymbol:'',
      createStartingPrice:0,
      createFundType:'',
      feesEntry:0,
      feesExit:0,
      feesRebalancing:0,
      feesManagement:0,
      feesMining:false,
      tokenSearch:'',
      tokenSelectedCountries:'',
      tokenList:{},
      customizeFundCreator:'',
      customizeFundLogo:'',
      customizeFundDesc:'',
      publishCheckbox:false,
    };

    this.setState = this.setState.bind(this);
    
    this.items = [
      {
        label: 'Create',
        command: () => {
          this.setState({ activeIndex: 0 });
        },
      },
      {
        label: 'Fees',
        command: () => {
          this.setState({ activeIndex: 1 });
        },
      },
      {
        label: 'Tokens',
        command: () => {
          this.setState({ activeIndex: 2 });
        },
      },
      {
        label: 'Customize',
        command: () => {
          this.setState({ activeIndex: 3 });
        },
      },
      {
        label: 'Publish',
        command: () => {
          this.setState({ activeIndex: 4 });
        },
      },
    ];
  }

  render() {

    this.componentPages = [
      <Create state={this.state} onChange={this.setState} />,
      <Fees state={this.state} onChange={this.setState} />,
      <Token state={this.state} onChange={this.setState} />,
      <Customize state={this.state} onChange={this.setState} />,
      <Publish state={this.state} onChange={this.setState} />,
    ];
    

    return (
      <div className='cfund-main'>
        <section>
          <div className='steps-demo'>
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


        {this.componentPages[this.state.activeIndex]}
        
        
        <div className='p-field p-col-12 p-md-12 p0 m0'>
          <Button
            label='Back'
            id='btnback'
            onClick={() => {
              if(this.state.activeIndex<=0){
                this.setState({activeIndex:0})
                window.location = '/createfunds';
              } else {
                this.setState({activeIndex:this.state.activeIndex-1})
              }
            }}
            className='p-button p-component p-button-outlined p-button-secondary p-col-5 p-mt-21'
          />
          <Button
            label='Continue'
            onClick={() => {
              if(this.state.activeIndex>=4){
                this.setState({activeIndex:4})
                window.location='/home'
              } else {
                this.setState({activeIndex:this.state.activeIndex+1})
              }
            }}
            className='p-button p-component p-button-info p-col-5 p-mt-21 p-ml-5'
            id='btncont'
          />
        </div>
      </div>
    );
  }
}
export default InitSteps;
