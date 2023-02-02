import React, { Component } from 'react';
import '../Css/Table.css';
import Menu from './Menu';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

class Table extends Component{
    constructor(props){
        super(props);
        this.state={
            count : 0
        }
    }
    //NHẬN NEWCOUNT TỪ SHOW ORDER
    // Notification = (data) =>{
    //     this.setState({
    //         count : data,
    //     })
    // }

    render(){
        let login = this.props.login && this.props.login.loginSTT === true ? this.props.login.loginSTT : null;
        return(
            !login ? <Navigate to="/login" /> 
            :<div className="container">
                <div className="row justify-content-center">
                    <Menu notification={this.Notification}/>
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

export default connect(mapSTP, null)(Table);