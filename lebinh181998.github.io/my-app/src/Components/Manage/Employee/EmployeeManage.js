import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as actions from '../../../actions/index';
import ErrorsForm from '../../ErrorsForm';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

class EmployeeManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            images: '',
            foodID: '',
            errors: {},
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/employees')
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.actgetEmployees(data.employees);
                }
                // console.log(data);
            })
            .catch(error => console.log(error));
    }

    Page = (e)=>{
        let pageUrl = 'http://127.0.0.1:8000/api/employees?page=' + e.target.value;
        axios.get(pageUrl)
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.actgetEmployees(data.employees);
                }
            })
            .catch(error => console.log(error));
    }

    SearchEmployee = (e)=>{
        let word = e.target.value.toLowerCase();
        let formData = new FormData();
        let err_flag = true;
        if(word){
            formData.append('word', word);
        }
        axios.post('http://127.0.0.1:8000/api/employees/search', 
        formData,
        {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200) {
                this.props.actgetEmployees(data.employees);
            }
        })
        .catch(error => console.log(error));
    }

    toggleAddEmployee = () =>{
        this.props.actToggleAddEmployee();
    }

    toggleEditEmployee  = (e)=>{
        this.props.actToggleEditEmployee(e.target.id);
        axios.get('http://127.0.0.1:8000/api/employees/employee/'+e.target.id)
        .then(res => {
            var data = res.data;
            if (data.status == 200) {
                this.props.actgetEmployee(data.employee);
            }
        })
        .catch(error => console.log(error));
    }

    Errors = (errors)=>{
        this.setState({
            errors : errors
        })
    }
    
    DelEmployee = (e)=>{
        const formData = new FormData();
        let errors = [];
        let err_flag = true;
        e.target.id ? formData.append('id', e.target.id) : err_flag = false;
        if(err_flag == true){ 
            if(window.confirm('bạn có chác chắn xoá không?')){
                axios.post('http://127.0.0.1:8000/api/employee/delete',
                    formData,
                    {headers: { 'content-type': 'multipart/form-data' }})
                .then(res => {
                    var data = res.data;
                    if (data.response == 'success') {
                        this.props.actgetEmployees(data.employees);
                        alert('xoá thành công');
                    }
                })
                .catch(error => console.log(error))
            }
        }
        else{alert('ERROR SERVER');} 
    }

    render() {
        let {errors, foodID} = this.state;
        let getEmployee = this.props.getEmployees ? this.props.getEmployees.employees.data : null;
        let cr_page = this.props.getEmployees ? this.props.getEmployees.employees.current_page : null;
        let last_page = this.props.getEmployees ? this.props.getEmployees.employees.last_page : null;
        let toggleAddEmployee = this.props.getEmployees ? this.props.getEmployees.toggleAddEmployee : null;
        let toggleEditEmployee = this.props.getEmployees ? this.props.getEmployees.toggleEditEmployee : null;
        return (
            <div className='col-md-8'>
                <div className='row'>
                    <div className="col-md-9 form-inline p-0">
                        <input className="form-control mr-sm-2" 
                            type="search" 
                            onChange={this.SearchEmployee}
                            placeholder="Search name" 
                            aria-label="Search" />
                        {/* <button className="btn btn-outline-success my-2 my-sm-0" 
                            type="submit">Search</button> */}
                    </div>
                    <div id='employee-back' className="col-md-3 p-0 text-right">
                        <button className='btn btn-primary' 
                        onClick={this.toggleAddEmployee}>
                                Add Employee
                        </button>
                    </div>
                </div>
                <ErrorsForm errors={errors} />
                {toggleAddEmployee == true ? 
                    <AddEmployee getErrors={this.Errors} toggleAddEmployee={this.toggleAddEmployee}/>
                :''}
                {toggleEditEmployee == true ? 
                    <EditEmployee getErrors={this.Errors} toggleEditEmployee={this.toggleEditEmployee}/>
                :''}
                {getEmployee ? 
                    getEmployee.map((employee, index)=>{
                        return (
                            <div key={index} className='row border-bottom pt-2 pb-2'>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-9 text-left p-0'>
                                        <p className='pl-2 m-0'>ID: {employee.id}</p>
                                            <p className='pl-2 m-0'>Name: {employee.name}</p>
                                            <p className='pl-2 m-0'>email: {employee.email}</p>
                                            <p className='pl-2 m-0'>Vị trí: {employee.level}</p>
                                        </div>
                                        <div className='col-md-3 p-0 text-right'>
                                            <a 
                                            href={toggleEditEmployee == true ? 
                                                '#employee-back' 
                                            : '#'+ employee.name}>
                                                <input type='button' id={employee.id} className='btn btn-success' 
                                                    onClick={this.toggleEditEmployee}
                                                    value='Update'/>
                                            </a>
                                            <input id={employee.id} type='button' className='btn btn-danger' 
                                                onClick={this.DelEmployee}
                                                value='X'/>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        )
                    })
                :''}
                <div className='row text-center pt-3'>
                    <div className='col-md-12 text-center'>
                        <div className='col-md-12 text-center'>
                            {cr_page - 1 > 0 ?
                                <input type='button' onClick={this.Page} className='btn btn-primary' 
                                    value={cr_page - 1}/> 
                            : ''}
                            {cr_page <= last_page ?
                                <input type='button' onClick={this.Page} className='btn btn-primary' 
                                    value={cr_page}/> 
                            : ''}
                            {cr_page + 1 <= last_page ?
                                <input type='button' onClick={this.Page} className='btn btn-primary' 
                                    value={cr_page + 1}/> 
                            : ''}
                        </div>
                    </div>
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
        actgetEmployees: (employees) =>{
            dispatch(actions.GetEmployees(employees));
        },
        actgetEmployee: (employee) =>{
            dispatch(actions.GetEmployee(employee));
        },
        actToggleAddEmployee: () =>{
            dispatch(actions.ToggleAddEmployee());
        },
        actToggleEditEmployee: (employeeID) =>{
            dispatch(actions.ToggleEditEmployee(employeeID));
        }
    }
}

export default connect(mapSTP, mapDTP)(EmployeeManage);