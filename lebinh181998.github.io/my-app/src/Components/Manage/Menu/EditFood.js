import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import { Link, Navigate } from 'react-router-dom';

class EditFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            images: '',
            check: [],
        }
    }
    
    dataFood = (e) =>{
        let {name, value, files} = e.target;
        let values = files ? files : value;
        this.setState({
            [name] : values,
        })
    }

    CheckImage = (e)=>{
        let {checked, value} = e.target;
        let check = this.state.check;
        if(checked) {
            check.push(value);;
        } 
        else {
            check = check.filter(item => item != value);
        }
        this.setState({
            check : check,
        })
    }

    EditFood = (e) =>{
        e.preventDefault();
        let getFood = this.props.getFood && this.props.getFood.food ? this.props.getFood.food : null;
        let {name, price, images, check} = this.state;
        let foodID = e.target.id;
        const formData = new FormData();
        const lm_size = 1024 * 1024;
        let flag = true;
        let errors = [];
        let err_flag = true;
        if(foodID){
            formData.append('id', foodID);
        }
        if(images.length >= 0){
            Object.keys(images).map((key, index)=>{ 
                if(images[key].size > lm_size){
                        errors.push(images[key].name + ' có kích thước ảnh quá giới hạn cho phép')
                    flag = false;
                }
                formData.append('image[]', images[key]);
            })
        }
        else{
            err_flag = false;
        }
        if(name){
            formData.append('name', name);
        }
        else{
            getFood && getFood[0].name ? formData.append('name', getFood[0].name) : err_flag = false;
        }
        if(price){
            formData.append('price', price);
        }
        else{
            getFood && getFood[0].price ? formData.append('price', getFood[0].price) : err_flag = false;
        }

        if(check.length >= 0){
            formData.append('checked', JSON.stringify(check));
        }
        else{
            err_flag = false;
        }

        if(flag == false){
            this.props.getErrors(errors);
        }
        else{
            err_flag == true ?
                axios.post('http://127.0.0.1:8000/api/menu/editfood', 
                    formData,
                    {headers: { 'content-type': 'multipart/form-data' }})
                    .then(res => {
                        var data = res.data;
                        if (data.response == 'success') {
                            this.props.actGetMenu(data.menu);
                            this.props.toggleEditFood(e);
                            alert('chỉnh sửa thành công');
                        }
                        if (data.response == 'error') {
                            this.props.getErrors(data.errors);
                        }
                    })
                    .catch(error => console.log(error))
            : alert('ERROR SERVER');
        }
    }

    render() { 
        let getFood = this.props.getFood && this.props.getFood.food ? this.props.getFood.food : null;
        let getImages = getFood && getFood[0] ? JSON.parse(getFood[0].image) : [];
        let {name, price} = this.state;
        return (
            getFood ?
                <div className='row mt-2'>
                    <div className="col-md-6 offset-md-3 p-0 border border-success">
                        <div className='row m-0'>
                            <div className='col-md-11 p-0'>
                                <h3 className='text-success'>SỬA</h3>
                            </div>
                            <div className='col-md-1 p-0'>
                                <input type='button' className='btn btn-danger p-0 px-2'
                                    id={getFood[0].id ? getFood[0].id : ''} 
                                    onClick={(e)=>this.props.toggleEditFood(e)}  value='X'/>
                            </div>
                        </div>
                        <form onSubmit={this.EditFood} value='2' className="form-horizontal form-material p-2"
                            id={getFood[0].id ? getFood[0].id : ''} >
                            <div className="row form-group m-0">
                                <span className="col-md-3 input-group-text">Name</span>
                                <div className="col-md-9 p-0">
                                    <input className='form-control form-control-line'
                                        onChange={this.dataFood}
                                        type="text" name="name"
                                        placeholder={getFood[0].name ? getFood[0].name : 'error'}
                                        value={name ? name : ''}/>
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <span className="col-md-3 input-group-text">Price($)</span>
                                <div className="col-md-9 p-0">
                                    <input className='form-control form-control-line'
                                        onChange={this.dataFood}
                                        type="text" name="price" 
                                        placeholder={getFood[0].price ? getFood[0].price : 'error'}
                                        value={price ? price : ''}/>
                                </div>
                            </div>
                            <div className="row form-group m-0">
                                <span className="col-md-3 input-group-text">Image</span>
                                <div className="col-md-9 p-0">
                                    <input className='form-control form-control-line'
                                        onChange={this.dataFood}
                                        type="file" name="images"
                                        accept="image/*" multiple />
                                </div>
                            </div>
                            <div className="row form-group m-0 mt-2">
                                {getImages.map((image, index)=>{
                                    let editStyle={
                                        height : 100,
                                    }
                                    return (
                                        <div key={index} className="col-md-4 p-1">
                                            <img style={editStyle} className='img-fluid ' 
                                            src={"http://127.0.0.1:8000/storage/upload/food/" 
                                            + getFood[0].id + "/1_" +image} />
                                            <input id={index} type="checkbox" 
                                                onChange={this.CheckImage}
                                                name="check" multiple value={index}/>
                                        </div>
                                    )
                                })}
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
        getFood: state.reducerManage,
    }
}

const mapDTP = (dispatch, props) => {
    return {
        actGetMenu: (menu) =>{
            dispatch(actions.GetMenu(menu));
        },
        actGetFood: (food) =>{
            dispatch(actions.GetFood(food));
        },
    }
}

export default connect(mapSTP, mapDTP)(EditFood);