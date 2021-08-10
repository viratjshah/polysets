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
      chkreme:false,
      loading:false,

    }
    this.Constants = this.props?.constants;
    this.nextPage = this.props?.nextpage;
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
          if(!res.data.success){
            this.props.showError({error:true, errorMessage:res.data.msg? res.data.msg : 'Signup failed'})
          }
          this.setState({ success: res.data.success, loading:false });
          window.location=this.nextPage||'/';
        })
        .catch((err) => {
          this.props.showError({error:true, errorMessage:'Signup failed'})
          console.log(err);
          this.setState({loading:false})
        });

    } else if (this.props.mode === 'login') {
      
      console.log('login');
      url = this.Constants.BASE_URL + this.Constants.LOGIN;
      console.log({ username: username, password: password });
      axios
        .post(url, { username:username, password:password })
        .then((res) => {
          console.log(res.data);
          if(!res.data.success){
            this.props.showError({error:true, errorMessage:res.data.msg ? res.data.msg : 'Login failed'})
          }
          this.setState({ success: res.data.success, loading:false });
          window.location=this.nextPage||'/';
        })
        .catch((err) => {
          console.log(err);
          this.props.showError({error:true, errorMessage:'Login failed'})
          this.setState({loading:false})
        });

    } else if (this.props.mode === 'resetpwd') {
      url = this.Constants.BASE_URL + this.Constants.RESET;
      console.log({ username: username });
      axios
        .post(url, { username: username })
        .then((res) => {
          console.log(res.data);
          if(!res.data.success){
            this.props.showError({error:true, errorMessage:res.data.msg? res.data.msg : 'Request failed'})
          }
          this.setState({ success: res.data.success, loading:false });
          window.location=this.nextPage||'/';
        })
        .catch((err) => {
          console.log(err);
          this.props.showError({error:true, errorMessage:res.data.msg? res.data.msg : 'Request failed'})
          this.setState({loading:false})

        });
    }
  }
  
  validation(){
    this.setState({loading:true});
    let lowerCase = /[a-z]/g;
    let upperCase = /[A-Z]/g;
    let number = /[0-9]/g;
    let specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    validPassword = false;
    validUsername = false;
    let username = this.state.username;
    let password = this.state.password;
    if(this.props.mode ==='resetpwd'){
      validPassword=true;
    } else if (
      password.match(lowerCase) &&
      password.match(upperCase) &&
      password.match(number) &&
      password.match(specialChar) &&
      password.length >= 8
    ) {
      if (this.props.mode === 'signup') {
        if (password === this.state.repassword) {
          validPassword = true;
        } else {
          this.props.showError({error:true, errorMessage:'Passwords do not match'});
          this.setState({loading:false})
        }
      } else {
        validPassword = true;
      }
    }
    if (!username.trim().includes(' ') && username.match(pattern)){
      validUsername = true;
    }

    if(validUsername && validPassword){
      this.props.showError({error:false, errorMessage:''});
      this.authorize();
    }else {
      if(!validUsername && !validPassword){
        this.props.showError({error:true, errorMessage:'Invalid Username and password'});
        this.setState({loading:false})
      }else if(!validUsername){
        this.props.showError({error:true, errorMessage:'Invalid Username'});
        this.setState({loading:false})
      }else if(!validPassword){
        this.props.showError({error:true, errorMessage:'Invalid Password.'});
        this.setState({loading:false})
      }
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

          {(mode === 'signup') && (
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
            loading={this.state.loading} 
            loadingOptions={{ position: 'right' }}
            label={
              mode === 'login'
                ? 'Login'
                : mode === 'signup'
                ? 'Sign Up'
                : mode === 'resetpwd'
                ? 'Reset Password'
                : 'Assign mode as "login", "signup" or "resetpwd"'
            }
            onClick={() => this.validation()}
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