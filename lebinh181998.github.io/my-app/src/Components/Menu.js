import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import ShowMenu from './ShowMenu';
import ShowOrder from './ShowOrder';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        const formData = new FormData();
		formData.append('tableID', auth.tableID);
        axios.post('http://127.0.0.1:8000/api/table', 
            formData, 
            {headers: { 'content-type': 'multipart/form-data' }})
            .then(res => {
                var data = res.data;
                if (data.status == 200) {
                    this.props.listTable(data.tables);
                }
            })
            .catch(error => console.log(error));
    }
    onToggleActive =(e)=>{
        let tableID = e.target.id;
        const formData = new FormData();
        formData.append('email', 'user'+tableID+'@gmail.com');
        formData.append('name', 'user'+tableID);
        formData.append('password', tableID+tableID+tableID+tableID+tableID+tableID);
        formData.append('password_c', tableID+tableID+tableID+tableID+tableID+tableID);
        formData.append('tableID', tableID);
        formData.append('level', 3);
        axios.post('http://127.0.0.1:8000/api/employee/add', 
            formData,
            {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200 && data.response == 'success') {
                alert('Thêm khách hàng thành công');
                this.props.toggleActive(tableID);
            }
            else{
                alert('checkout try again');
            }
        })
        .catch(error => console.log(error));
    }

    onToggleMenu = (e) => {
        //CHANGE STATUS MENU
        this.props.toggleMenu(e.target.id, e.target.value);
    }
    onToggleOrder = (e) => {
        let tableID = e.target.id;
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        let lcsOrder = localStorage.getItem(tableID) ? JSON.parse(localStorage.getItem(tableID)) : null;
        const formData = new FormData();
        // formData.append('user_id', auth.id);
        formData.append('table_id', tableID);
        axios.post('http://127.0.0.1:8000/api/menu/showorder', 
            formData,
            {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200 && data.response == 'success') {
                if(auth.level == 3){
                    this.props.toggleOrder(e.target.id, e.target.value, lcsOrder);
                }
                else{
                    this.props.toggleOrder(e.target.id, e.target.value, data.orders[0]);
                }
            }
            else{
                this.props.toggleOrder(e.target.id, e.target.value, null);
            }
        })
        .catch(error => console.log(error));
    }
    Order = (tableID) =>{
        this.props.actOrder(tableID);
    }
    RMFood = (tableID, foodName) =>{
        this.props.actRMFood(tableID, foodName);
    }

    render() {
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        // console.log(auth);
        let tables = this.props.getTables.tables;
        return tables.map((table, index) => {
            let lcs = JSON.parse(localStorage.getItem(table.id));
            return (
                <div key={index} className="col-md-4 menu">
                    <div className="row">
                        {/* BUTTON MENU */}
                        {auth.level == 3 ? 
                            <button 
                                id={table.id} 
                                onClick={this.onToggleMenu} 
                                className="col-md-6 menu-button p-0" 
                                name="toggleMenu"
                                value={table.id == Number(this.props.lcsMenu.id) ?
                                        this.props.lcsMenu.toggleMenu 
                                    : 'false'}>
                            Menu</button> 
                        : ''}
                        {/* BUTTON ORDER */}
                        <button 
                            id={table.id} 
                            onClick={this.onToggleOrder} 
                            className="col-md-6 order-button p-0"
                            name="toggleOrder" 
                            value={table.id == Number(this.props.lcsMenu.id) ?
                                    this.props.lcsMenu.toggleOrder 
                                : 'false'}>
                        Đơn</button>
                    </div>
                    {/* ẨN HIỆN MENU  */}
                    {table.id == Number(this.props.lcsMenu.id) 
                    && this.props.lcsMenu.toggleMenu == true ?
                            <ShowMenu tableID={table.id} /> 
                        : ''}
                    {/* ẨN HIỆN ORDER  */}
                    {table.id == Number(this.props.lcsMenu.id) 
                    && this.props.lcsMenu.toggleOrder == true ?
                            <ShowOrder rmFood={this.RMFood} 
                            order={this.Order} tableID={table.id} /> 
                        : ''}
                    {/* HƯỚNG DẪN KHÁCH HÀNG */}
                    <div className="row last">
                        <div className='col-md-12'>
                            <p className='col-md-12 m-0 p-0 text-white'>Vào Đơn để đặt món sau khi chọn xong.</p>
                        </div>
                        <div className='col-md-12'>
                            <h1 className='col-md-12 m-0 p-0 text-white'>BÀN {table.id}</h1>
                        </div>
                        {auth.level != 3 ? 
                            <div className='col-md-2 offset-md-5'>
                                <input id={table.id} className='col-md-12 m-0 p-0 text-white bg-primary' 
                                    type='button'
                                    onClick={this.onToggleActive}
                                    value={lcs.active == true ? 'ON' : 'OFF'}/>
                            </div>
                        :''}
                    </div>
                </div>
            )
        })
    }
}

const mapSTP = state =>{
    return {
        lcsMenu: state.reducerMenu,
        getTables: state.reducerTable,
    }
}

const mapDTP = (dispatch, props) =>{
    return {
        toggleMenu: (id, toggleMenu) => {
            dispatch(actions.toggleMenu(id, toggleMenu));
        },
        toggleOrder: (id, toggleOrder, data) => {
            dispatch(actions.lisOrder(id, toggleOrder, data));
        },
        toggleActive: (id) => {
            dispatch(actions.ToggleActive(id));
        },
        actOrder:(tableID) =>{
            dispatch(actions.Order(tableID));
        },
        actRMFood: (tableID, foodName) =>{
			dispatch(actions.RMFood(tableID, foodName));
		},
        listTable:(table) =>{
            dispatch(actions.listTable(table));
        }
    }
}

export default connect(mapSTP, mapDTP)(Menu);