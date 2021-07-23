import React from 'react';
import Landing from '../components/Landing';
import AuthnForm from '../react-components/AuthnForm';


const AuthnPage = (props) => {
  return (
    <section className='p-grid p-m-0'>
      <Landing />
      <AuthnForm mode={props.mode} />
    </section>
  );
}
export default AuthnPage;
