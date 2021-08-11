import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            wallet: '',
            profileImg: 'https://cdn.iconscout.com/icon/premium/png-256-thumb/profile-1506810-1278719.png',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            wallet: this.state.wallet,
        }
        
        axios.post('/api/users/profile', user)
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
            });
    }

    photoUpload = e =>{
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
          this.setState({
            file: file,
            profileImg: reader.result
          });
        }
        reader.readAsDataURL(file);
      }
      

    render() {
        return (
            <>
                <div className="container" style={{ marginTop: '2%', width: '80%' }}>
                    <h2 style={{ marginBottom: '2%' }}>My Profile</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="photo-upload" className="custom-file-upload fas">
                            <div className="img-wrap img-upload" >
                                <img src={this.state.profileImg}
                                style={{height: "100px", width: "100px" ,border:"2px solid black", borderRadius: "50%"}}/>
                            </div>
                            <input id="photo-upload" type="file" onChange={this.photoUpload} style={{display: 'none'}} />
                        </label>                <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                className='form-control form-control-lg'
                                name="name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className='form-control form-control-lg'
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label style={{ fontWeight: 'bold' }}>Wallet Address</label>
                            <input
                                type="text"
                                placeholder="Wallet Address"
                                className= 'form-control form-control-lg'
                                name="wallet"
                                onChange={this.handleInputChange}
                                value={this.state.wallet}
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <button type="button" className="btn btn-success">
                                Change Password
                            </button>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-outline-dark" style={{ marginRight: '10%', marginTop: '3%', width: '40%' }}>
                                Exit
                            </button>
                            <button type="submit" className="btn btn-primary" style={{ marginRight: '10%', marginTop: '3%', width: '40%' }}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default Profile