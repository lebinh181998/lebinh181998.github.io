import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import { Link, Navigate } from 'react-router-dom';

class AddEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            password_c: '',
            level: 2,
        }
    }

    
    dataEmployee = (e) =>{
        let name = e.target.name;
        let value = e.target.files ? e.target.files : e.target.value;
        this.setState({
            [name] : value,
        })
    }

    AddEmployee = (e) =>{
        e.preventDefault();
        let {email, name, password, password_c, level} = this.state;
        const formData = new FormData();
        let flag = true;
        let errors = [];
        formData.append('email', email);
        formData.append('name', name);
        formData.append('password', password);
        formData.append('password_c', password_c);
        formData.append('level', level);
        formData.append('tableID', 0);
        axios.post('http://127.0.0.1:8000/api/employee/add', 
            formData,
            {headers: { 'content-type': 'multipart/form-data' }})
            .then(res => {
                var data = res.data;
                if (data.status == 200 && data.response == 'success') {
                    this.props.actGetEmployees(data.employees);
                    this.props.toggleAddEmployee();
                    alert('Thêm nhân viên thành công');
                }
                if (data.response == 'error') {
                    this.props.getErrors(data.errors);
                }
                
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className='row mt-2'>
                <div className="col-md-6 offset-md-3 p-0 border border-primary">
                    <div className='row m-0'>
                        <div className='col-md-11 p-0'>
                            <h3 className='text-primary'>THÊM NHÂN VIÊN</h3>
                        </div>
                        <div className='col-md-1 p-0'>
                            <input type='button' onClick={this.props.toggleAddEmployee} className='btn btn-danger p-0 px-2' value='X'/>
                        </div>
                    </div>
                    <form onSubmit={this.AddEmployee} className="form-horizontal form-material p-2">
                    <div className="row form-group m-0">
                            <span className="col-md-4 input-group-text">Email</span>
                            <div className="col-md-8 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataEmployee}
                                    required
                                    type="email" name="email" />
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-4 input-group-text">Name</span>
                            <div className="col-md-8 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataEmployee}
                                    required
                                    type="text" name="name" />
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-4 input-group-text">Password</span>
                            <div className="col-md-8 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataEmployee}
                                    required
                                    type="password" name="password" />
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-4 input-group-text">Password-c</span>
                            <div className="col-md-8 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataEmployee}
                                    required
                                    type="password" name="password_c" />
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-4 input-group-text">Vị trí</span>
                            <div className="col-md-8 p-0">
                                <select className="form-control form-control-line"
                                    onChange={this.dataEmployee}
                                    name="level" 
                                    value={this.state.level}>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <div className="col-md-12 p-0 pt-2 text-right">
                                <input type="submit" className='btn btn-primary' value="ADD" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapSTP = state => {
    return {
        getEmployees: state.reducerManage,
    }
}

const mapDTP = (dispatch, props) => {
    return {
        actGetEmployees: (employees) =>{
            dispatch(actions.GetEmployees(employees));
        },
    }
}

export default connect(mapSTP, mapDTP)(AddEmployee);