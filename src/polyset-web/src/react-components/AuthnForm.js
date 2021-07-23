import React, {Component} from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Constants } from '../utils/Constants';


class AuthnForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      repassword:'',
      chkreme:false
    }
  }

  authorize() {
    let username = this.state.username;
    let password = this.state.password;
    let url = '';
    if (this.mode === 'signup') {
      
      url = Constants.BASE_URL + '/auth/register';
      console.log({ username: username, password: password });
      axios
        .post(url, { username:username, password:password })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
        })
        .catch((err) => {
          console.log(err);
        });

    } else if (this.mode === 'login') {
      
      console.log('login');
      url = Constants.BASE_URL + '/auth/login';
      console.log({ username: username, password: password });
      axios
        .post(url, { username:username, password:password })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
        })
        .catch((err) => {
          console.log(err);
        });

    } else if (this.mode === 'resetpwd') {
      
      url = Constants.BASE_URL + '/auth/resetrequest';
      console.log({ username: username });
      axios
        .post(url, { username: username })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }


  render (){
    const mode = this.props.mode;
    return (
      <div className='p-field p-col-6 p-md-6 p-mt-5 authpght'>
        <div className='card'>
          <div className='p-grid p-mt-2 p-m-0'>
            <div className='p-col'>
              <div className='box'>
                <InputText
                  id='emailaddress'
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  placeholder='Email address'
                  type='text'
                />
              </div>
            </div>
          </div>

          {mode !== 'resetpwd' && (
            <div className='p-grid p-mt-2 p-m-0'>
              <div className='p-col'>
                <div className='box'>
                  <InputText
                    id='password'
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    placeholder='Password'
                    type='password'
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className='p-grid p-mt-2 p-m-0'>
              <div className='p-col'>
                <div className='box'>
                  <InputText
                    id='repassword'
                    value={this.state.repassword}
                    onChange={(e) =>
                      this.setState({ repassword: e.target.value })
                    }
                    placeholder='Re-enter Password'
                    type='password'
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className='loginchk'>
              <Checkbox
                inputId='chkreme'
                onChange={() => this.setState({ chkreme: !this.state.chkreme })}
                checked={this.state.chkreme}
              />
              <label htmlFor='chkreme' className='p-ml-2'>
                Remember Me
              </label>
            </div>
          )}

          <Button
            label={
              mode === 'login'
                ? 'Login'
                : mode === 'signup'
                ? 'Sign Up'
                : 'Reset Password'
            }
            onClick={() => this.authorize()}
            className='p-button-info p-mt-2'
          />

          {mode === 'login' && (
            <small className='loginfgtpwd'>
              <a href='/resetpwd'> Forgot Password?</a>
            </small>
          )}
        </div>
      </div>
    );
}
}

export default AuthnForm;