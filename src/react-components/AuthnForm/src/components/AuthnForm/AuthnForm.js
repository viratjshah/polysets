import React, {Component} from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

class AuthnForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      repassword:'',
      chkreme:false
    }
    this.Constants = this.props?.constants;
    this.nextPage = this.props?.nextpage;
    this.token = this.props?.token;
  }

  authorize() {
    let username = this.state.username;
    let password = this.state.password;
    let url = '';
    if (this.props.mode === 'signup') {
      
      url = this.Constants.BASE_URL + this.Constants.REGISTER;
      console.log({ username: username, password: password });
      axios
        .post(url, { username:username, password:password })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
          window.location=this.nextPage||'/';
        })
        .catch((err) => {
          console.log(err);
        });

    } else if (this.props.mode === 'login') {
      
      console.log('login');
      url = this.Constants.BASE_URL + this.Constants.LOGIN;
      console.log({ username: username, password: password });
      axios
        .post(url, { username:username, password:password })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
          window.location=this.nextPage||'/';
        })
        .catch((err) => {
          console.log(err);
        });

    } else if (this.props.mode === 'resetpwd') {
      
      url = this.Constants.BASE_URL + this.Constants.RESET;
      console.log({ username: username });
      axios
        .post(url, { username: username })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
          window.location=this.nextPage||'/';
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (this.props.mode === 'token') {
      url = this.Constants.BASE_URL + this.Constants.TOKEN + this.token;
      console.log({ password: password });
      axios
        .post(url, { password: password })
        .then((res) => {
          console.log(res.data);
          this.setState({ success: res.data.success });
          window.location=this.nextPage||'/';
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
                {mode !== 'token' &&
                <InputText
                  id='emailaddress'
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  placeholder='Email address'
                  type='text'
                />
                }
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

          {(mode === 'signup'|| mode === 'token') && (
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

export {AuthnForm};