import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render(){
        let login = this.props.login && this.props.login.loginSTT === true ? this.props.login.loginSTT : null;
        return (
            !login ? <Navigate to="/login" /> : 
            <div>
                <p>Home</p>
            </div>
        )
    }
}
const mapSTP = state => {
    return {
        login: state.reducerAccount,
    }
}

export default connect(mapSTP, null)(Home);
