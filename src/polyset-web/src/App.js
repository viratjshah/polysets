import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { InputText } from 'primereact/inputtext';
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
import CreateFPFees from './pages/CreateFPFees';
import AddTokens from './pages/AddTokens';
import Customize from './pages/Customize';
import CreateSetPages from './pages/CreateSetPage';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const items = [
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
    return (
      <Router>
        <div className='App'>
          <header className='p-grid p-m-0'>
            <div className='p-field p-col-12 p-md-12'>
              <Menubar
                model={items}
                end={
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
              />
            </div>
          </header>
          <section className='p-grid p-m-0'>
            <Switch>
              <Route exact path='/login'>
                {' '}
                <AuthnPage mode='login' />{' '}
              </Route>
              <Route exact path='/signup'>
                {' '}
                <AuthnPage mode='signup' />{' '}
              </Route>
              <Route exact path='/resetpwd'>
                {' '}
                <AuthnPage mode='resetpwd' />{' '}
              </Route>
              <Route exact path='/' component={CreateFunds} />
              <Route exact path='/feature' component={Feature} />
              <Route exact path='/pricing' component={Pricing} />
              <Route exact path='/faqs' component={Faqs} />
              <Route exact path='/about' component={About} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/createset' component={CreateSetPages} />
            </Switch>
          </section>
          <footer className='textcenter'>
            {' '}
            PrideVel Business Solutions LCC{' '}
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
