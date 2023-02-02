import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as actions from '../../../actions/index';
import ErrorsForm from '../../ErrorsForm';
import AddFood from './AddFood';
import EditFood from './EditFood';

class MenuManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodID: '',
            errors: {},
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/menu')
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.actGetMenu(data.menu);
                }
            })
            .catch(error => console.log(error));
    }

    Page = (e)=>{
        let pageUrl = 'http://127.0.0.1:8000/api/menu?page=' + e.target.value;
        axios.get(pageUrl)
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.actGetMenu(data.menu);
                }
            })
            .catch(error => console.log(error));
    }

    SearchFood = (e)=>{
        let word = e.target.value.toLowerCase();
        let formData = new FormData();
        let err_flag = true;
        if(word){
            formData.append('word', word);
        }
        axios.post('http://127.0.0.1:8000/api/menu/search', 
        formData,
        {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200) {
                this.props.actGetMenu(data.menu);
            }
        })
        .catch(error => console.log(error));
    }

    toggleAddFood = () =>{
        this.props.actToggleAddFood();
    }

    toggleEditFood = (e)=>{
        this.props.actToggleEditFood(e.target.id);
        axios.get('http://127.0.0.1:8000/api/menu/food/'+e.target.id)
        .then(res => {
            var data = res.data;
            if (data.status == 200) {
                this.props.actGetFood(data.food);
            }
        })
        .catch(error => console.log(error));
    }

    Errors = (errors)=>{
        this.setState({
            errors : errors
        })
    }
    
    DelFood = (e)=>{
        const formData = new FormData();
        let errors = [];
        let err_flag = true;
        e.target.id ? formData.append('id', e.target.id) : err_flag = false;
        if(err_flag == true){ 
            if(window.confirm('bạn có chác chắn xoá không?')){
                axios.post('http://127.0.0.1:8000/api/menu/delete',
                    formData,
                    {headers: { 'content-type': 'multipart/form-data' }})
                .then(res => {
                    var data = res.data;
                    if (data.response == 'success') {
                        this.props.actGetMenu(data.menu);
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
        let getMenu = this.props.getMenu ? this.props.getMenu.menu.data : null;
        let cr_page = this.props.getMenu ? this.props.getMenu.menu.current_page : null;
        let last_page = this.props.getMenu ? this.props.getMenu.menu.last_page : null;
        let toggleAddFood = this.props.getMenu ? this.props.getMenu.toggleAddFood : null;
        let toggleEditFood = this.props.getMenu ? this.props.getMenu.toggleEditFood : null;
        return (
            <div className='col-md-8'>
                <div className='row'>
                    <div className="col-md-9 form-inline p-0">
                        <input className="form-control mr-sm-2" 
                            type="search" 
                            onChange={this.SearchFood}
                            placeholder="Search name" 
                            aria-label="Search" 
                            />
                        {/* <button className="btn btn-outline-success my-2 my-sm-0" 
                            type="submit">Search</button> */}
                    </div>
                    <div id='menu-back' className="col-md-3 p-0 text-right">
                        <button className='btn btn-primary' 
                        onClick={this.toggleAddFood}>
                                Add Food
                        </button>
                    </div>
                </div>
                <ErrorsForm errors={errors} />
                {toggleAddFood == true ? 
                    <AddFood getErrors={this.Errors} toggleAddFood={this.toggleAddFood}/>
                :''}
                {toggleEditFood == true ? 
                    <EditFood getErrors={this.Errors} toggleEditFood={this.toggleEditFood}/>
                :''}
                {getMenu ? 
                    getMenu.map((food, index)=>{
                        let image = JSON.parse(food.image)[0];
                        return (
                            <div key={index} className='row border-bottom pt-2 pb-2'>
                                <div className='col-md-3 p-0'>
                                    <img className='img-fluid' 
                                    src={"http://127.0.0.1:8000/storage/upload/food/" + food.id + "/1_" +image} />
                                </div>
                                <div className='col-md-9'>
                                    <div className='row'>
                                    <div className='col-md-9 text-left p-0'>
                                        <p className='pl-2 m-0'>Name: {food.name}</p>
                                        <p className='pl-2 m-0'>Price: {food.price}</p>
                                    </div>
                                    <div className='col-md-3 p-0 text-right'>
                                        <a href={toggleEditFood == true ? 
                                                '#menu-back' 
                                            : '#'+food.name}>
                                            <input type='button' id={food.id} className='btn btn-success' 
                                                onClick={this.toggleEditFood}
                                                value='Update'/>
                                        </a>
                                        <input id={food.id} type='button' className='btn btn-danger' 
                                            onClick={this.DelFood}
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
                        {/* <a href='http://127.0.0.1:8000/api/menu?page=2'>aaaaaaa</a> */}
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
        getMenu: state.reducerManage,
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
        actToggleAddFood: () =>{
            dispatch(actions.ToggleAddFood());
        },
        actToggleEditFood: (foodID) =>{
            dispatch(actions.ToggleEditFood(foodID));
        }
    }
}

export default connect(mapSTP, mapDTP)(MenuManage);