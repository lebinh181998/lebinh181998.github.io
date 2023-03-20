import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import '../Css/Table.css';
import { connect } from 'react-redux';
import axios from 'axios';

class NotFound extends Component{


    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <h1>Not Found</h1>
                </div>
            </div>
        )
    }
}


export default NotFound;