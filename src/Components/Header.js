import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from './../actions/index';
import { connect } from 'react-redux';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    LogForm = () =>{
        this.props.actLogForm();
    }

    Logout = () =>{
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		const formData = new FormData();
		formData.append('user_id', auth.id);
        formData.append('level', auth.level);
		axios.post('http://127.0.0.1:8000/api/logout', 
            formData,
            {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200 && data.response == 'success') {
				this.props.actLogout();
                this.props.actLogForm();
            }
            else{
                alert('checkout and try again');
                this.props.actLogForm();
            }
        })
        .catch(error => console.log(error));
        
    }

    render() {
        let logForm = this.props.logForm && this.props.logForm.logFormSTT === true ? 
                        this.props.logForm.logFormSTT : null;        
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        // console.log(logForm);
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='#'>APP</Link>
                <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/table">Table</Link>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" 
                                to='#' id="navbarDropdown" 
                                role="button" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">
                                    Dropdown
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="">Action</Link>
                                <Link className="dropdown-item" to="">Another action</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="">Something else here</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="/menu">Menu</Link>
                        </li> */}
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                    <div className="form-inline my-2 my-lg-0">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <Link onClick={this.LogForm} className="nav-link dropdown-toggle log-click">
                                    {auth ? auth.name : ''}
                                </Link>
                                {logForm ? 
                                    <div className="dropdown-menu log-form">
                                        {auth && auth.level == 1 ? 
                                            <Link className="dropdown-item" 
                                                onClick={this.LogForm} 
                                                to="/manage">
                                                    Manage
                                            </Link>
                                        : ""}
                                        <Link onClick={this.Logout} className="dropdown-item" to="">Logout</Link>
                                    </div>
                                :''}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapSTP = state => {
	return {
		logForm: state.reducerAccount,
	}
}

const mapDTP = (dispatch, props) => {
	return {
		actLogForm: () =>{
            dispatch(actions.LogForm());
        },
        actLogout: () =>{
            dispatch(actions.Logout());
        }
	}
}

export default connect(mapSTP, mapDTP)(Header);
