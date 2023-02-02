import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

class ErrorsForm extends Component {
    constructor(props) {
        super(props);
    }

    showErrors = () => {
        let errors = this.props.errors;
        if (errors instanceof Array) {
            return (
                errors.map((error, index) => {
                    return <p className='col-md-12 p-0 m-0 text-danger' key={index}>{error}</p>
                })
            )
        }
        else {
            return (
                Object.keys(errors).map((error, index) => {
                    return <p className='col-md-12 p-0 m-0 text-danger' key={index}>{errors[error]}</p>
                })
            )
        }
    }

    render() {
        return (
            <div className='errors-form row'>
                {this.showErrors()}
            </div>
        )
    }
}

export default ErrorsForm;