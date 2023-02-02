import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import { Link, Navigate } from 'react-router-dom';

class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_c: '',
            level: '',
        }
    }

    
    dataEmployee = (e) =>{
        let name = e.target.name;
        let value = e.target.files ? e.target.files : e.target.value;
        this.setState({
            [name] : value,
        })
    }

    EditEmployee = (e) =>{
        e.preventDefault();
        let getEmployee = this.props.getEmployees && this.props.getEmployees.employee ? 
                            this.props.getEmployees.employee : null;
        let employeeID = e.target.id;
        let {email, name, password, password_c, level} = this.state;
        let err_flag = true;
        const formData = new FormData();
        let flag = true;
        let errors = [];
        formData.append('name', name);
        formData.append('password', password);
        formData.append('password_c', password_c);
        formData.append('level', level);
        getEmployee && getEmployee[0].email ? formData.append('email', getEmployee[0].email) : err_flag = false;
        if(employeeID){
            formData.append('id', employeeID);
        }
        if(name){
            formData.append('name', name);
        }
        else{
            getEmployee && getEmployee[0].name ? formData.append('name', getEmployee[0].name) : err_flag = false;
        }
        if(password){
            if(password == password_c){
                formData.append('newPassword', password);
            }
            else {
                errors.push('Xác nhận lại password');
                flag = false;
            }
        }
        if(flag == false){
            this.props.getErrors(errors);
        }
        else{
            err_flag == true ?
                axios.post('http://127.0.0.1:8000/api/employee/edit', 
                formData,
                {headers: { 'content-type': 'multipart/form-data' }})
                .then(res => {
                    var data = res.data;
                    console.log(data);
                    if (data.status == 200 && data.response == 'success') {
                        this.props.actGetEmployees(data.employees);
                        this.props.toggleEditEmployee(e);
                        alert('Sửa thông tin nhân viên thành công');
                    }
                    if (data.response == 'error') {
                        this.props.getErrors(data.errors);
                    }
                })
                .catch(error => console.log(error))
            : errors.push('ERROR SERVER');
            this.props.getErrors(errors);
        }
    }

    render() {
        let {email, name, password, password_c, level} = this.state;
        let getEmployee = this.props.getEmployees && this.props.getEmployees.employee ? 
                            this.props.getEmployees.employee : null;
        return (
            getEmployee ?
                <div className='row mt-2'>
                    <div className="col-md-6 offset-md-3 p-0 border border-success">
                        <div className='row m-0'>
                            <div className='col-md-11 p-0'>
                                <h3 className='text-success'>SỬA THÔNG TIN NV</h3>
                            </div>
                            <div className='col-md-1 p-0'>
                                <input type='button' className='btn btn-danger p-0 px-2' value='X'
                                    id={getEmployee[0].id ? getEmployee[0].id : ''}
                                    onClick={(e)=>this.props.toggleEditEmployee(e)}/>
                            </div>
                        </div>
                        <form id={getEmployee[0].id} onSubmit={this.EditEmployee} className="form-horizontal form-material p-2">
                            <div className="row form-group m-0">
                                <span className="col-md-4 input-group-text">Email</span>
                                <div className="col-md-8 p-0">
                                    <input className='form-control form-control-line'
                                        placeholder={getEmployee[0].email ? getEmployee[0].email : 'error'}
                                        type="email" name="email" />
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <span className="col-md-4 input-group-text">Name</span>
                                <div className="col-md-8 p-0">
                                    <input className='form-control form-control-line'
                                        onChange={this.dataEmployee}
                                        placeholder={getEmployee[0].name ? getEmployee[0].name : 'error'}
                                        type="text" name="name" />
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <span className="col-md-4 input-group-text">Password</span>
                                <div className="col-md-8 p-0">
                                    <input className='form-control form-control-line'
                                        onChange={this.dataEmployee}
                                        type="password" name="password" />
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <span className="col-md-4 input-group-text">Password-c</span>
                                <div className="col-md-8 p-0">
                                    <input className='form-control form-control-line'
                                        onChange={this.dataEmployee}
                                        type="password" name="password_c" />
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <span className="col-md-4 input-group-text">Vị trí</span>
                                <div className="col-md-8 p-0">
                                    <select className="form-control form-control-line"
                                        onChange={this.dataEmployee}
                                        name="level" 
                                        value={level ? level : (getEmployee[0].level ? getEmployee[0].level : 'error')}>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <div className="col-md-12 p-0 pt-2 text-right">
                                    <input type="submit" className='btn btn-success' value="EDIT" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            : ''
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

export default connect(mapSTP, mapDTP)(EditEmployee);