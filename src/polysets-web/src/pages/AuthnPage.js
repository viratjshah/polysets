import React from 'react';
import Landing from '../components/Landing';
import {AuthnForm} from '@pridevel/authnform';
import {Constants} from '../utils/Constants';
import { render } from 'react-dom';

class AuthnPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error:false,
      errorMessage:'',
    }
    this.setState = this.setState.bind(this)
  }

  render(){
    return (
      <section className='p-grid p-m-0'>
      { this.state.error&& 
      <div className="alert alert-danger" role="alert">
        {this.state.errorMessage}
      </div>
      }
      <Landing />
      <AuthnForm mode={this.props.mode} constants={Constants} showError={this.setState} 
         /*token={token}*/
         />
    </section>
    );
  }
}
export default AuthnPage;
