import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import ErrorsForm from '../ErrorsForm';
import * as actions from './../../actions/index';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			password_c: '',
			level: 3,
			errors: {},
		}
	}

	Register = (e) =>{
		e.preventDefault();
		const formData = new FormData();
		formData.append('name', this.state.name);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
		formData.append('password_c', this.state.password_c);
		formData.append('level', this.state.level);
        axios.post('http://127.0.0.1:8000/api/register',
                    formData, 
                    {headers: { 'content-type': 'multipart/form-data' }} )
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    // console.log(data.Auth);
					localStorage.setItem('token', JSON.stringify(data.token));
                    localStorage.setItem('auth', JSON.stringify(data.Auth));
                    this.props.actLogin();
                }
                if(data.response == 'errorData'){
                    this.setState({
						errors : data.errors,
					})
                }
            })
            .catch(error => console.log(error));
	}

	RegisterAcc = (e) =>{
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name] : value,
		})
	}

	render() {
		let {errors} = this.state;
		let login = this.props.login && this.props.login.loginSTT === true ? this.props.login.loginSTT : null;
		return (
			login ? <Navigate to="/" />
            :<div className="container">
				<div className="row">
					<div className="col-md-4 offset-md-4">
						<h1>REGISTER</h1>
						<ErrorsForm errors={errors} />
						<form onSubmit={this.Register} className="form-horizontal form-material">
							<div className="row form-group">
								<label className="col-md-4 input-group-text p-0 text-center">Full Name</label>
								<div className="col-md-8 p-0">
									<input type="text" className="form-control form-control-line"
										onChange={this.RegisterAcc}
										required
										name="name" />
								</div>
							</div>
							<div className="row form-group">
								<label className="col-md-4 input-group-text p-0">Email</label>
								<div className="col-md-8 p-0">
									<input type="email" className="form-control form-control-line"
										onChange={this.RegisterAcc}
										required
										name="email"  />
								</div>
							</div>
							<div className="row form-group">
								<label className="col-md-4 input-group-text p-0">Password</label>
								<div className="col-md-8 p-0">
									<input type="password"  className="form-control form-control-line" 
										onChange={this.RegisterAcc}
										required
										name="password"/>
								</div>
							</div>
							<div className="row form-group">
								<label className="col-md-4 input-group-text p-0">Password Confirm</label>
								<div className="col-md-8 p-0">
									<input type="password" className="form-control form-control-line" 
										onChange={this.RegisterAcc}
										required
										name="password_c" />
								</div>
							</div>
							<div className="row form-group">
								<div className="col-sm-12">
									<button name="register" className="btn btn-success">Register</button>
									<Link to="/login">Login</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
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

export default connect(mapSTP, mapDTP)(Register);