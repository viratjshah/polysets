import React from 'react'; 
import { Button } from 'primereact/button';
class CreateFunds extends React.Component {  
  render() {
      return (
         <div className="cfund-main cyfpght {">            
            <div className="p-grid">
               <div className="p-col-2">&nbsp;</div>
               <div className="p-col-10">
               <h2>Create Your Funds</h2>
               </div>
            </div>
            <div className="p-grid">
               <div className="p-col-2">
                  <img src='write.png' />
               </div>
               <div className="p-col-10 p-mt-3">
                  <strong>Name Your Fund</strong> &ndash; Name your Set and select a starting point
               </div>
            </div>
            <div className="p-grid">
               <div className="p-col-2">
                  <img src='tokens.png' />
               </div>
               <div className="p-col-10 p-mt-3">
                  <strong>Set Fees</strong> &ndash; Set fees you want to charge to your fund holders
               </div>
            </div>
            <div className="p-grid">
               <div className="p-col-2">
                  <img src='write.png' />
               </div>
               <div className="p-col-10 p-mt-1">
                  <strong>Choose Your Tokens</strong> &ndash; Choose Tokens you want to include in your Funds and adjust their allocations. These can be change later
               </div>
            </div>
            <div className="p-grid">
               <div className="p-col-2">
                  <img src='customize.png' />
               </div>
               <div className="p-col-10 p-mt-1">
                  <strong>Customize</strong> &ndash; Write name of the creator, choose image for the fund, and description of your fund
               </div>
            </div>
            <div className="p-grid">
               <div className="p-col-2">
                  <img src='publish.png' />
               </div>
               <div className="p-col-10 p-mt-1">
                  <strong>Publish</strong> &ndash; Deploy your Fund to the Ethereum mainnet. Once published your Fund will be able to issue collateralized ERC20 tokens.
               </div>
            </div>
            <div className='p-grid'>
               <div className="p-col-2">&nbsp;</div>
               <div className="p-col-4 p0">
                  <Button label="Get Started"  onClick={() => {
                  window.location = '/createset';
                }} className="p-button p-button-info" />
               </div>               
            </div>
         </div>
      );
   }  
}  
export default CreateFunds; 