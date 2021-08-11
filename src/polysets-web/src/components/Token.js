import React from 'react';
import 'primeflex/primeflex.css';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';
import _ from 'lodash';

class Token extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      haveTokens: false,
      tokens: undefined,
      sortedTokens: undefined,
      selectedToken: props.state.tokenList,
    };
  }

  componentDidMount() {
    if (!this.state.haveTokens) {
      axios
        .get('https://api.1inch.exchange/v3.0/137/tokens')
        .then((response) => {
          let listOfTokens = _.values(response.data.tokens);
          this.setState({
            tokens: listOfTokens,
            isLoading: false,
            haveTokens: true,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            tokens: undefined,
            isLoading: false,
            haveTokens: false,
          });
        });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(!_.isEqual(prevState.selectedTokens,this.state.selectedToken)){
      setTimeout(()=>{
        this.props.onChange({tokenList:this.state.selectedToken})
      },250)
    }
  }

  searchTokens = (event) => {
    setTimeout(() => {
      let result = [];
      if (!event.query.trim().length) {
        result = [...this.state.tokens];
      } else {
        this.state.tokens.forEach((entry) => {
          if (
            entry.name.toLowerCase().startsWith(event.query.toLowerCase()) ||
            entry.symbol.toLowerCase().startsWith(event.query.toLowerCase())
          ) {
            entry.alloc = 0;
            result.push(entry);
          }
        });
      }
      this.setState({ sortedTokens: result });
    }, 250);
  };

  tokenTemplate(token) {
    return (
      <div className='token-item input100'>
        <img
          alt={token.symbol}
          src={token.logoURI}
          onError={(e) =>
            (e.target.src =
              'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
          }
        />
        <div>
          <h6> {token.name} </h6>
          <small> ({token.symbol}) </small>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2 className='p-mt-5'>Add Tokens To Your Set</h2>
        <div className='p-field p-col-12 p-md-12 p0'>
          <p>
            You can add or remove tokens later by rebalancing. The more tokens
            you include within your Set, the more gas it will cost for the user
            to Buy and Sell your Set.
          </p>
          <div class='alert alert-danger'>
            Before proceeding, please review our Set Creation Guide as not all
            ERC20 token are compatible with the Set Protocol. Incorrectly
            configuring Set with illiquid or obscure tokens can result in locked
            funds and lost of network fees.
          </div>
          <div>
            {/* <ListBox value={props.state.selectedCountries} options={tokens} onChange={(e) => props.onChange({ selectedCountries: e.value })} multiple filter optionLabel="name"
                     itemTemplate={countryTemplate} style={{  }} listStyle={{ maxHeight: '250px' }} /> */}
            <AutoComplete
              disabled={this.state.isLoading}
              value={this.state.selectedToken}
              suggestions={this.state.sortedTokens}
              completeMethod={this.searchTokens}
              field='name'
              multiple
              onChange={(e) => this.setState({ selectedToken: e.value })}
              itemTemplate={this.tokenTemplate}
              className='input100'
              placeholder='Search Token'
            />
          </div>
          <section className='p-mt-4'>
            <div className='p-grid gridheader'>
              <div className='p-col-5'>
                <strong>Tokens</strong>
              </div>
              <div className='p-col-5 textleft'>
                <strong>Allocation</strong>
              </div>
            </div>
            {this.state.selectedToken ? (
              this.state.selectedToken.map((value, index) => {
                let array = this.state.selectedToken;
                console.log(value, index);
                return (
                  <div className='p-grid' key={index}>
                    <div className='p-col'>
                      <p>{value.symbol}</p>
                    </div>
                    <div className='p-col'>
                      <InputNumber
                        suffix='%'
                        id='tokenAlloc'
                        mode='decimal'
                        minFractionDigits={2}
                        maxFracionDigits={2}
                        min={0}
                        max={100}
                        className='input100'
                        value={array[index].alloc}
                        onChange={(e) => {
                          array[index].alloc = e.target.value;
                          this.setState({ selectedToken: array });
                        }}
                      />
                      <Slider
                        step={0.01}
                        min={0}
                        max={100}
                        value={array[index].alloc}
                        onChange={(e) => {
                          array[index].alloc = e.value;
                          this.setState({ selectedToken: array });
                        }}
                      />
                    </div>
                    <div className='p-col text-right' style={{marginTop:'7px'}}>
                      <Button
                        label='Remove'
                        className='p-button-danger tbtnsm'
                        onClick={() => {
                          let list = this.state.selectedToken;
                          list.splice(index, 1);
                          this.setState({ selectedToken: list });
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <small> Search for tokens to add here </small>
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }
}
export default Token;
