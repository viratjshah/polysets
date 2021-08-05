import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Feature from './pages/Feature';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Faqs from './pages/Faqs';
import AuthnPage from './pages/AuthnPage';
import CreateFunds from './pages/CreateFunds';
import CreateSetPages from './pages/CreateSetPage';
import PasswordReset from './pages/PasswordReset';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
    
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut = () => localStorage.removeItem('user')

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
                 
                    {!this.state.currentUser && 
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
                    {this.state.currentUser && 
                      <Button
                        label='Logout'
                        onClick={() => {
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
              <Route exact path='/login'>
                <AuthnPage mode='login' />
              </Route>
              <Route exact path='/signup'>
                <AuthnPage mode='signup' />
              </Route>
              <Route exact path='/resetpwd'>
                {' '}
                <AuthnPage mode='resetpwd' />{' '}
              </Route>
              <Route exact path='/reset' component={PasswordReset} />              
              <Route exact path='/' component={CreateFunds} />
              <Route exact path='/feature' component={Feature} />
              <Route exact path='/pricing' component={Pricing} />
              <Route exact path='/faqs' component={Faqs} />
              <Route exact path='/about' component={About} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/createset' component={CreateSetPages} />
            </Switch>
          </section>
          <footer className='textcenter'> PrideVel Business Solutions LCC </footer>
        </div>
    );
  }
}

export default App;
