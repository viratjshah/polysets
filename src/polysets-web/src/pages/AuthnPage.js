import React from 'react';
import Landing from '../components/Landing';
import AuthnForm from '../react-components/AuthnForm';
import {Constants} from '../utils/Constants';

const AuthnPage = (props) => {
  
  //  const {computedMatch:{params}}=props;
  //  const token = decodeURIComponent(params.token);
  
  return (
    <section className='p-grid p-m-0'>
      <Landing />
      <AuthnForm mode={props.mode} constants={Constants} 
         /*token={token}*/
       />
    </section>
  );
}
export default AuthnPage;
