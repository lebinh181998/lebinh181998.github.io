import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate, Outlet } from 'react-router-dom';
import MenuManage from './Menu/MenuManage';

class Manage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let login = this.props.login && this.props.login.loginSTT === true ? this.props.login.loginSTT : null;
		return (
			!login ? <Navigate to="/login" />
            :<div className="container">
				<div className="row">
                    <div className='col-md-4'>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
								<Link className="dropdown-item p-0" to="/manage/menu">Menu Manage</Link>
							</li>
                            <li className="list-group-item">
								<Link className="dropdown-item p-0" to="/manage/employee">Employee Manage</Link>
							</li>
							<li className="list-group-item">
								<Link className="dropdown-item p-0" to="/manage/orders">Orders Manage</Link>
							</li>
                        </ul>
                    </div>
					<Outlet/>
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

	}
}

export default connect(mapSTP, mapDTP)(Manage);