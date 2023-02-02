import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';
import { Link, Navigate } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            login: false,
        }
    }

    Login = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        // console.log(this.state.email);
        // console.log(this.state.password);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        axios.post('http://127.0.0.1:8000/api/login',
                    formData, 
                    {headers: { 'content-type': 'multipart/form-data' }} )
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    // console.log(data);
                    localStorage.setItem('token', JSON.stringify(data.token));
                    localStorage.setItem('auth', JSON.stringify(data.Auth));
                    this.props.actLogin();
                }
                else{
                    alert(data.error);
                }
            })
            .catch(error => console.log(error));
    }

    LoginAcc = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    render() {
        let login = this.props.login && this.props.login.loginSTT === true ? this.props.login.loginSTT : null;
        let {email, password} = this.state;
        return (
            !login ? <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <h1>LOGIN</h1>
                        <form onSubmit={this.Login} className="form-horizontal form-material">
                            <div className="row form-group">
                                <span className="col-md-3 input-group-text p-0">Email</span>
                                <div className="col-md-9 p-0">
                                    <input className="form-control form-control-line"
                                        onChange={this.LoginAcc}
                                        type="email" 
                                        name="email"
                                        required
                                        value={email}/>
                                </div>
                            </div>
                            <div className="row form-group">
                                <label className="col-md-3 input-group-text p-0">Password</label>
                                <div className="col-md-9 p-0">
                                    <input className="form-control form-control-line"
                                        onChange={this.LoginAcc}
                                        type="password" 
                                        name="password"  
                                        required
                                        value={password}/>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-12">
                                    <button name="login" className="btn btn-success">Login</button>
                                    <Link to="/register">Register</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            : <Navigate to="/" />
        )
    }
}

const mapSTP = state => {
    return {
        login: state.reducerAccount,
    }
}

const mapDTP = (dispatch, props) => {
    return {
        actLogin: () =>{
            dispatch(actions.Login());
        }
    }
}

export default connect(mapSTP, mapDTP)(Login);