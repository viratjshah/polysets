import React, {Component} from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

class AuthnForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repassword: '',
      chkreme: false,
      loading: false,
      validPassword: false,
      validUsername: false,
    };
    this.pattern = {
      lowerCase: /[a-z]/g,
      upperCase: /[A-Z]/g,
      number: /[0-9]/g,
      specialChar: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g,
      email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    };
    this.Constants = this.props?.constants;
    this.nextPage = this.props?.nextpage;
  }

  authorize() {
    let username = this.state.username;
    let password = this.state.password;
    let url = '';
    if (this.props.mode === 'signup') {
      if(!this.state.validPassword||!this.state.validUsername || this.state.password !== this.state.repassword){
        this.props.showError({error:true, errorMessage:'Please re-check email address and password'})
        return
      }
      url = this.Constants.BASE_URL + this.Constants.REGISTER;
      console.log({ username: username, password: password });
      axios
        .post(url, { username: username, password: password })
        .then((res) => {
          console.log(res.data);
          if (!res.data.success) {
            this.props.showError({
              error: true,
              errorMessage: res.data.msg ? res.data.msg : 'Signup failed',
            });
          }
          this.setState({ success: res.data.success, loading: false });
          window.location = '/login';
        })
        .catch((err) => {
          this.props.showError({
            error: true,
            errorMessage: 'Signup failed',
          });
          console.log(err);
          this.setState({ loading: false });
        });
    } else if (this.props.mode === 'login') {
      if(!this.state.validPassword||!this.state.validUsername){
        this.props.showError({error:true, errorMessage:'Please re-check email address and password'})
        return
      }

      console.log('login');
      url = this.Constants.BASE_URL + this.Constants.LOGIN;
      axios
        .post(url, { username: username, password: password })
        .then((res) => {
          console.log(res.data);
          if (!res.data.success) {
            this.props.showError({
              error: true,
              errorMessage: res.data.msg ? res.data.msg : 'Login failed',
            });
            this.setState({ loading: false });
          } else if (res.data.success && res.data.token) {
            window.sessionStorage.setItem('access-token', res.data.token);
            this.setState({ success: res.data.success, loading: false });
            window.location = '/login';
          } else {
            this.props.showError({
              error: true,
              errorMessage: `Could not complete request`,
            });
            this.setState({ loading: false });
          }
        })
        .catch((err) => {
          console.log(err);
          this.props.showError({ error: true, errorMessage: 'Login failed' });
          this.setState({ loading: false });
        });
    } else if (this.props.mode === 'resetpwd') {
      if(!this.state.validUsername){
        this.props.showError({error:true, errorMessage:'Please re-check email address'})
        return
      }
      url = this.Constants.BASE_URL + this.Constants.RESET;
      console.log({ username: username });
      axios
        .post(url, { username: username })
        .then((res) => {
          console.log(res.data);
          if (!res.data.success) {
            this.props.showError({
              error: true,
              errorMessage: res.data.msg ? res.data.msg : 'Request failed',
            });
          }
          this.setState({ success: res.data.success, loading: false });
        })
        .catch((err) => {
          console.log(err);
          this.props.showError({
            error: true,
            errorMessage: JSON.stringify(err),
          });
          this.setState({ loading: false });
        });
    }
  }

  usernameHandler(username) {
    if (username.match(this.pattern.email)) {
      this.props.showError({ error: false,errorMessage: ''});
      this.setState({ validUsername: true, username: username });
    } else {
      this.props.showError({
        error: true,
        errorMessage: 'Please enter a valid email address.',
      });
      this.setState({ validUsername: false, username: username });
    }
  }

  passwordHandler(password) {
    if (
      password.match(this.pattern.lowerCase) &&
      password.match(this.pattern.upperCase) &&
      password.match(this.pattern.specialChar) &&
      password.match(this.pattern.number) &&
      password.length >= 8
    ) {
      this.props.showError({ error: false, errorMessage: '' });
      if (this.props.mode === 'signup') {
        this.setState({ password: password });
      } else {
        this.setState({ validPassword: true, password: password });
      }
    } else {
      this.props.showError({
        error: true,
        errorMessage:
          'Password should contain at least one: Uppercase character, lowercase character, special character a number and must be atleast 8 characters long',
      });
      this.setState({ validPassword: false, password: password });
    }
  }

  repasswordHandler(repassword) {
    if (repassword === this.state.password) {
      this.props.showError({error: false, errorMessage: ''});
      this.setState({ repassword: repassword, validPassword: true });
    } else {
      this.props.showError({ error: true, errorMessage: 'Passwords do not match',});
      this.setState({ validPassword: false, repassword: repassword });
    }
  }

  // validation() {
  //   let validPassword = false;
  //   let validUsername = false;
  //   let username = this.state.username;
  //   let password = this.state.password;
  //   if (this.props.mode === 'resetpwd') {
  //     validPassword = true;
  //   } else if (
  //     password.match(pattern.lowerCase) &&
  //     password.match(pattern.upperCase) &&
  //     password.match(pattern.number) &&
  //     password.match(pattern.specialChar) &&
  //     password.length >= 8
  //   ) {
  //     if (this.props.mode === 'signup') {
  //       if (password === this.state.repassword) {
  //         validPassword = true;
  //       } else {
  //         this.props.showError({
  //           error: true,
  //           errorMessage: 'Passwords do not match',
  //         });
  //         this.setState({ loading: false });
  //         return;
  //       }
  //     } else {
  //       validPassword = true;
  //     }
  //   }
  //   if (!username.trim().includes(' ') && username.match(pattern.email)) {
  //     validUsername = true;
  //   }

  //   if (validUsername && validPassword) {
  //     this.props.showError({ error: false, errorMessage: '' });
  //     this.authorize();
  //   } else {
  //     if (!validUsername && !validPassword) {
  //       this.props.showError({
  //         error: true,
  //         errorMessage: 'Invalid Username and password',
  //       });
  //       this.setState({ loading: false });
  //     } else if (!validUsername) {
  //       this.props.showError({ error: true, errorMessage: 'Invalid Username' });
  //       this.setState({ loading: false });
  //     } else if (!validPassword) {
  //       this.props.showError({
  //         error: true,
  //         errorMessage: 'Invalid Password.',
  //       });
  //       this.setState({ loading: false });
  //     }
  //   }
  // }

  render() {
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
                  onChange={(e) => this.usernameHandler(e.target.value)}
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
                    onChange={(e) => this.passwordHandler(e.target.value)}
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
                    onChange={(e) => this.repasswordHandler(e.target.value)}
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
            disabled={this.state.loading}
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