import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import axios from 'axios';

class Notification extends Component{
    constructor(props){
        super(props);
        this.state ={
            show: false,
        }
    }

    Confirm = (e) =>{
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		let tableID = e.target.id;
        let lcsOrder = localStorage.getItem(tableID) ? JSON.parse(localStorage.getItem(tableID)) : null;
		// const formData = new FormData();
		// formData.append('table_id', tableID);
        // formData.append('order2', JSON.stringify(lcsOrder.order));
		// axios.post('http://127.0.0.1:8000/api/menu/updateorder', 
        //     formData,
        //     {headers: { 'content-type': 'multipart/form-data' }})
        // .then(res => {
        //     var data = res.data;
        //     if (data.status == 200 && data.response == 'success') {
        //         this.props.actConfirm(tableID);
        //     }
        //     console.log(data);
        // })
        // .catch(error => console.log(error));
    }

    //FORM THÔNG BÁO
    Notification = (list_tableID) =>{
        let table_id = null;
        //LẤY TABLE ID LỌC THÔNG BÁO
        if(this.props.confirm){
            table_id = Number(this.props.confirm.tableID);
        }
        return(
            <div className='bg-warning showNotifications'>
                {list_tableID.map((tableID, index)=>{
                    return (
                        table_id && table_id != tableID ?
                        <p className='m-1 pl-4' key={index}>Bàn {tableID} đang gọi...
                            <kbd id={tableID} onClick={this.Confirm} className='col-md-12 p-0'>ok</kbd>
                        </p>
                        : <p className='m-1 pl-4' key={index}>Bàn {tableID} đang gọi...
                            <kbd id={tableID} onClick={this.Confirm} className='col-md-12 p-0'>ok</kbd>
                        </p>
                    )
                })}
            </div>
            
        )
    }
    // HIỂN THỊ THÔNG BÁO
    showNotifications = () =>{
        this.setState({
            show : !this.state.show,
        })
    }

    render(){
        let table = [];
        let count = 0;
        let list_tableID = [];
        //OLDCOUNT
        for (var i = 0; i < localStorage.length; i++) {
            table = JSON.parse(localStorage.getItem(localStorage.key(i)))
            if(table && table.status == true){
                count += 1;
                list_tableID.push(Number(localStorage.key(i)));
            }
        };
        //COUNT THÔNG BÁO
        return(
            <div className="formNotification">
                    {count > 0 ? 
                        <div className="bg-warning rounded-circle notification">
                            <p className='m-0 py-3' onClick={this.showNotifications}>{count}</p> 
                        </div>
                    : ''}
                {this.state.show == true ? this.Notification(list_tableID) : ''}
            </div>
        )
    }
}

const mapSTP = state => {
    return {
        confirm : state.reducerNotification,
    }
}

const mapDTP = (dispatch, props) => {
    return {
        actConfirm : (tableID)=>{
            dispatch(actions.Confirm(tableID));
        }
    }
}

export default connect(mapSTP, mapDTP)(Notification);