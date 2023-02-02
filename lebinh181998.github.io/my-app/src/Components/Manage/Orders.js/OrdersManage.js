import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import * as actions from '../../../actions/index';
import ErrorsForm from '../../ErrorsForm';

class OrdersManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order_id: '',
            toggleOrder: false,
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/menu/orders')
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.actGetOrders(data.orders);
                }
            })
            .catch(error => console.log(error));
    }

    Page = (e) => {
        let pageUrl = 'http://127.0.0.1:8000/api/menu/orders?page=' + e.target.value;
        axios.get(pageUrl)
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.actGetOrders(data.orders);
                }
            })
            .catch(error => console.log(error));
    }

    // SearchFood = (e)=>{
    //     let word = e.target.value.toLowerCase();
    //     let formData = new FormData();
    //     let err_flag = true;
    //     if(word){
    //         formData.append('word', word);
    //     }
    //     axios.post('http://127.0.0.1:8000/api/menu/search', 
    //     formData,
    //     {headers: { 'content-type': 'multipart/form-data' }})
    //     .then(res => {
    //         var data = res.data;
    //         if (data.status == 200) {
    //             this.props.actGetMenu(data.menu);
    //         }
    //     })
    //     .catch(error => console.log(error));
    // }

    toggleOrder = (e) =>{
        this.setState({
            order_id: e.target.id,
            toggleOrder: !this.state.toggleOrder,
        })
    }

    // toggleEditFood = (e)=>{
    //     this.props.actToggleEditFood(e.target.id);
    //     axios.get('http://127.0.0.1:8000/api/menu/food/'+e.target.id)
    //     .then(res => {
    //         var data = res.data;
    //         if (data.status == 200) {
    //             this.props.actGetFood(data.food);
    //         }
    //     })
    //     .catch(error => console.log(error));
    // }

    // Errors = (errors)=>{
    //     this.setState({
    //         errors : errors
    //     })
    // }

    DelOrder = (e) => {
        const formData = new FormData();
        let err_flag = true;
        e.target.id ? formData.append('order_id', e.target.id) : err_flag = false;
        if (err_flag == true) {
            if (window.confirm('bạn có chác chắn xoá không?')) {
                axios.post('http://127.0.0.1:8000/api/menu/order/delete',
                    formData,
                    { headers: { 'content-type': 'multipart/form-data' } })
                    .then(res => {
                        var data = res.data;
                        if (data.response == 'success') {
                            this.props.actGetOrders(data.orders);
                            alert('xoá thành công');
                        }
                    })
                    .catch(error => console.log(error))
            }
        }
        else { alert('ERROR SERVER'); }
    }

    render() {
        // let {errors, foodID} = this.state;
        let getOrders = this.props.getOrders ? this.props.getOrders.orders.data : null;
        let cr_page = this.props.getOrders ? this.props.getOrders.orders.current_page : null;
        let last_page = this.props.getOrders ? this.props.getOrders.orders.last_page : null;
        const scrollspy = {
            position: 'relative',
            height: '270px',
            overflow: 'auto',
        }
        return (
            <div className='col-md-8'>
                {/* <div className='row'>

                </div> */}
                {/* <ErrorsForm errors={errors} /> */}
                {getOrders ?
                    getOrders.map((order, index) => {
                        return (
                            <div key={index} className='row border-bottom pt-2 pb-2'>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-9 text-left p-0'>
                                            <p className='pl-2 m-0'>id: {order.order_id}</p>
                                            <p className='pl-2 m-0'>table ID: {order.table_id}</p>
                                            <p className='pl-2 m-0'>
                                                order: <button id={order.order_id} onClick={this.toggleOrder} className='btn btn-light'>View</button>
                                            </p>
                                            {this.state.order_id == order.order_id && this.state.toggleOrder == true ? 
                                                <ul style={scrollspy} className="col-md-6 offset-md-3 scrollbar-ripe-malinka menu-result p-0 mb-0  border border-success">
                                                    {
                                                        JSON.parse(order.order).map((food, index) => {
                                                            return <li key={index} className=" border border-light p-2">
                                                                <p className='m-2'><span className='bg-primary p-1 text-white'>Name: {food.foodName}</span></p>
                                                                <p className='m-2'><span className='bg-warning p-1 text-white'>QTY: {food.qty}</span></p>
                                                                {food.note ?<p className='m-2'><span className='bg-danger p-1 text-white'>Note: {food.note}</span></p> : ''}
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            :''}
                                            <p className='pl-2 m-0'>sum: {order.price}</p>
                                            {order.status == 0 ?
                                                <p className='pl-2 m-0'>status: <span className='bg-danger'>Chưa thanh toán</span></p>
                                                : <p className='pl-2 m-0'>status: <span className='bg-success'>Đã thanh toán</span></p>}
                                        </div>
                                        <div className='col-md-3 p-0 text-right'>
                                            <input id={order.order_id} type='button' className='btn btn-danger'
                                                onClick={this.DelOrder}
                                                value='X' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : ''}
                <div className='row text-center pt-3'>
                    <div className='col-md-12 text-center'>
                        <div className='col-md-12 text-center'>
                            {cr_page - 1 > 0 ?
                                <input type='button' onClick={this.Page} className='btn btn-primary'
                                    value={cr_page - 1} />
                                : ''}
                            {cr_page <= last_page ?
                                <input type='button' onClick={this.Page} className='btn btn-primary'
                                    value={cr_page} />
                                : ''}
                            {cr_page + 1 <= last_page ?
                                <input type='button' onClick={this.Page} className='btn btn-primary'
                                    value={cr_page + 1} />
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
        getOrders: state.reducerManage,
    }
}

const mapDTP = (dispatch, props) => {
    return {
        actGetOrders: (orders) => {
            dispatch(actions.GetOrders(orders));
        },
        // actGetFood: (food) =>{
        //     dispatch(actions.GetFood(food));
        // },
        // actToggleAddFood: () =>{
        //     dispatch(actions.ToggleAddFood());
        // },
        // actToggleEditFood: (foodID) =>{
        //     dispatch(actions.ToggleEditFood(foodID));
        // }
    }
}

export default connect(mapSTP, mapDTP)(OrdersManage);