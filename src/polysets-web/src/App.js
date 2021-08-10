import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Feature from './pages/Feature';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Faqs from './pages/Faqs';
import AuthnPage from './pages/AuthnPage';
import CreateFunds from './pages/CreateFunds';
import CreateSetPages from './pages/CreateSetPage';
import PasswordReset from './pages/PasswordReset';
import PrivateRoute from './react-components/PrivateRoute';
import AuthRoute from './react-components/AuthRoute';

class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      userlogin:false
    };
  }

  componentDidMount(){
    if(!this.state.userlogin){
      const user = window.sessionStorage.getItem('access-token');
      if(user){
        this.setState({userlogin:true});
        console.log(`here's the token`);
      }
      console.log(`token: ${user}`);
    }
  }
  
  componentDidUpdate(){
    if(!this.state.userlogin){
      const user = window.sessionStorage.getItem('access-token');
      if(user){
        this.setState({userlogin:true});
        console.log(`here's the token`);
      }
      console.log(`token: ${user}`);
    }
  }


  render() {
    const logoutItems = [
      {
        label: 'Home',
        className: 'p-menuitem-active',
        command: () => {
          window.location = '/';
        },
      },
      {
        label: 'Feature',
        command: () => {
          window.location = '/feature';
        },
      },
      {
        label: 'Pricing',
        command: () => {
          window.location = '/pricing';
        },
      },
      {
        label: 'Faqs',
        command: () => {
          window.location = '/faqs';
        },
      },
      {
        label: 'About',
        command: () => {
          window.location = '/about';
        },
      },
      
    ];

    const loginItems = [
      {
        label: 'Home',
        className: 'p-menuitem-active',
        command: () => {
          window.location = '/';
        },
      },
            
    ];

    return (
        <div className='App'>
          <header className='p-grid p-m-0'>
            <div className='p-field p-col-12 p-md-12'>
              <Menubar
                model={this.state.userlogin?loginItems:logoutItems}
                end={
                  <div>
                    {!this.state.userlogin && 
                    <div>
                      <Button
                        label='Login'
                        onClick={() => {
                          window.location = '/login';
                        }}
                        className='p-button-info p-col-3 '
                        id='btnlogin'
                      />
                      <Button
                        label='Sign-up'
                        onClick={() => {
                          window.location = '/signup';
                        }}
                        className='p-button-info p-ml-2 p-col-3'
                        id='btnsignup' 
                      />
                    </div>
                    }
                    {this.state.userlogin && 
                      <Button
                        label='Logout'
                        onClick={() => { 
                          window.sessionStorage.removeItem('access-token');
                          window.location = '/login';
                        }}
                        className='p-button-info p-ml-2 p-col-11'
                        id='btnlogout'
                      />
                    }
                  </div>
                }
              />
            </div>
          </header>
          <section className='p-grid p-m-0'>
            <Switch>
              <Route exact path='/feature' isAuth={this.state.userlogin} component={Feature} />
              <Route exact path='/pricing' isAuth={this.state.userlogin} component={Pricing} />
              <Route exact path='/faqs' isAuth={this.state.userlogin} component={Faqs} />
              <Route exact path='/about' isAuth={this.state.userlogin} component={About} />
              <AuthRoute exact path='/login' isAuth={this.state.userlogin} Component = {AuthnPage} childProps={{mode:'login'}}/>
              <AuthRoute exact path='/signup' isAuth={this.state.userlogin} Component = {AuthnPage} childProps={{mode:'signup'}}/>
              <AuthRoute exact path='/resetpwd' isAuth={this.state.userlogin} Component = {AuthnPage} childProps={{mode:'resetpwd'}}/>
              <PrivateRoute exact path='/reset' isAuth={this.state.userlogin} Component={PasswordReset} />
              <PrivateRoute exact path='/' isAuth={this.state.userlogin} Component={CreateFunds}/>
              <PrivateRoute exact path='/home' isAuth={this.state.userlogin} Component={Home} />
              <PrivateRoute exact path='/createset' isAuth={this.state.userlogin} Component={CreateSetPages} />
            </Switch>
          </section>
          <footer className='textcenter'> PrideVel Business Solutions LCC </footer>
        </div>
    );
  }
}

export default App;

