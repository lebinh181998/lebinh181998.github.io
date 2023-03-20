import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import { Link, Navigate } from 'react-router-dom';

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            images: '',
            category_id: '1',
            categories: [],
        }
    }

    componentDidMount() {
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        axios.get('http://127.0.0.1:8000/api/category')
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.setState({
                        categories : data.category,
                    })
                }
            })
            .catch(error => console.log(error));
    }
    
    dataFood = (e) =>{
        let name = e.target.name;
        let value = e.target.files ? e.target.files : e.target.value;
        this.setState({
            [name] : value,
        })
    }

    AddFood = (e) =>{
        e.preventDefault();
        let {name, price, images, category_id} = this.state;
        const formData = new FormData();
        const lm_size = 1024 * 1024;
        let flag = true;
        let errors = [];
        Object.keys(images).map((key, index)=>{ 
            if(images[key].size > lm_size){
                    errors.push(images[key].name + ' có kích thước ảnh quá giới hạn cho phép')
                flag = false;
            }
            formData.append('image[]', images[key]);
        })
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category_id', category_id);
        if(flag == false){
            this.props.getErrors(errors);
        }
        else{
            axios.post('http://127.0.0.1:8000/api/menu/addfood', 
                formData,
                {headers: { 'content-type': 'multipart/form-data' }})
                .then(res => {
                    var data = res.data;
                    if (data.status == 200 && data.response == 'success') {
                        this.props.actGetMenu(data.menu);
                    }
                    if (data.response == 'error') {
                        this.props.getErrors(data.errors);
                    }
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className='row mt-2'>
                <div className="col-md-6 offset-md-3 p-0 border border-primary">
                    <div className='row m-0'>
                        <div className='col-md-11 p-0'>
                            <h3 className='text-primary'>THÊM</h3>
                        </div>
                        <div className='col-md-1 p-0'>
                            <input type='button' onClick={this.props.toggleAddFood} className='btn btn-danger p-0 px-2' value='X'/>
                        </div>
                    </div>
                    <form onSubmit={this.AddFood} className="form-horizontal form-material p-2">
                        <div className="row form-group m-0">
                            <span className="col-md-3 input-group-text">Name</span>
                            <div className="col-md-9 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataFood}
                                    required
                                    type="text" name="name" />
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-3 input-group-text">Price($)</span>
                            <div className="col-md-9 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataFood}
                                    required
                                    type="text" name="price" />
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-3 input-group-text">Category</span>
                            <div className="col-md-9 p-0">
                                <select className="form-control form-control-line"
                                    onChange={this.dataFood}
                                    name="category_id" 
                                    value={this.state.category_id}>
                                    {this.state.categories.map((category, index)=>{
                                        return (<option key={index} value={category.category_id}>{category.category_name}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row form-group m-0">
                            <span className="col-md-3 input-group-text">Image</span>
                            <div className="col-md-9 p-0">
                                <input className='form-control form-control-line'
                                    onChange={this.dataFood}
                                    required
                                    type="file" name="images"
                                    accept="image/*" multiple />
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
        getMenu: state.reducerManage,
    }
}

const mapDTP = (dispatch, props) => {
    return {
        actGetMenu: (menu) =>{
            dispatch(actions.GetMenu(menu));
        },
    }
}

export default connect(mapSTP, mapDTP)(AddFood);