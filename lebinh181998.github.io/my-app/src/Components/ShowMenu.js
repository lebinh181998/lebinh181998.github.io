import React, { Component } from 'react';
import '../Css/Table.css';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import axios from 'axios';

class ShowMenu extends Component {
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
                    this.props.listMenu(data.menu);
                }
            })
            .catch(error => console.log(error));
    }
    //THÊM MÓN VÀO ORDER
    addFood = (e) => {
        this.props.actAddFood(e.target.id, e.target.type, e.target.value);
    }
    render() {
        const scrollspy= {
            position: 'relative',
            height: '270px',
            overflow: 'auto',
        }
        let menu = this.props.getMenu.menu;
        //FORM MENU
        return (
            <div className="row pos" >
                <div className="col-md-12 showMenu p-0">
                    <ul style={scrollspy} className="col-md-12 scrollbar-ripe-malinka menu-result p-0 mb-0  border border-success">
                        {menu ?
                            menu.map((food, index) => {
                                return (
                                    <li className="border-top-0 border-right-0 border-left-0 border border-light" 
                                        id={food.id}
                                        type={food.name} 
                                        key={index}
                                        onClick={this.addFood} value={this.props.tableID}>{food.name}</li>
                                )
                            })
                            : '<li>chưa có menu</li>'
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapSTP = state =>{
    return {
        getMenu: state.reducerMenu,
    }
}

const mapDTP = (dispatch, props) =>{
    return {
        actAddFood: (foodID, foodName, tableID) => {
            dispatch(actions.addFood(foodID, foodName, tableID));
        },
        listMenu:(menu)=>{
            dispatch(actions.listMenu(menu));
        }
    }
}

export default connect(mapSTP, mapDTP)(ShowMenu);