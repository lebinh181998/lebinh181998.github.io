import React, { Component } from 'react';
import '../Css/Table.css';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import axios from 'axios';

class ShowOrder extends Component {

	//CHANGE QTY
	changeQTY = (e) => {
		this.props.actChangeQTY(e.target.id, e.target.name, e.target.value);
	}
	//CHANGE NOTE
	onNote = (e) => {
		this.props.actNote(e.target.id, e.target.name, e.target.value)
	}
	//GỬI THÔNG BÁO
	Call = (e) => {
		let tableID = e.target.id;
		let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		let lcsOrder = JSON.parse(localStorage.getItem(tableID));
		const formData = new FormData();
		formData.append('level', auth.level);
		formData.append('table_id', tableID);
        formData.append('order', JSON.stringify(lcsOrder.order));
		axios.post('http://127.0.0.1:8000/api/menu/updateorder', 
            formData,
            {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200 && data.response == 'success') {
				this.props.actCall(tableID);
            }
        })
        .catch(error => console.log(error));
		//GỬI COUNT THÔNG BÁO ĐẾN NOTIFICATION
		// this.props.notification(count);
		//GỬI TABLEID ĐÉN MENU HIỆN ALERT
		this.props.order(e.target.id);
	}
	// Called = (e)=>{
	// 	let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
	// 	let tableID = this.props.lcsOrder.id;
	// 	if(auth.level !=3){
	// 		let foodName = e.target.id;
	// 		const formData = new FormData();
	// 		formData.append('level', auth.level);
	// 		formData.append('table_id', tableID);
	// 		formData.append('foodName', foodName);
	// 		axios.post('http://127.0.0.1:8000/api/menu/updateorder', 
	// 			formData,
	// 			{headers: { 'content-type': 'multipart/form-data' }})
	// 		.then(res => {
	// 			var data = res.data;
	// 			console.log(data);
	// 			if (data.status == 200 && data.response == 'success') {
	// 			}
	// 		})
	// 		.catch(error => console.log(error));
	// 	}
	// }
	//XOÁ MÓN ĂN
	FoodDlt = (e) => {
		this.props.rmFood(e.target.id, e.target.name);
	}
	//CHECKOUT
	Checkout = (e) => {
		let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		let tableID = e.target.id;
		const formData = new FormData();
		formData.append('user_id', auth.id);
		formData.append('table_id', tableID);
		axios.post('http://127.0.0.1:8000/api/menu/checkout', 
            formData,
            {headers: { 'content-type': 'multipart/form-data' }})
        .then(res => {
            var data = res.data;
            if (data.status == 200 && data.response == 'success') {
				this.props.actCheckout(tableID);
            }
        })
        .catch(error => console.log(error));
	}

	render() {
		let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
		let tableID = this.props.lcsOrder.id;
		let confirm = this.props.confirm.lcs_order2;
		let list_order = [];
		let list_order2 = [];
		// console.log(JSON.parse(this.props.lcsOrder.table.order).length);
		if(this.props.lcsOrder && this.props.lcsOrder.table && typeof this.props.lcsOrder.table.order != 'string'){
			list_order = this.props.lcsOrder && this.props.lcsOrder.table ?
						this.props.lcsOrder.table.order : null;
			list_order2 = this.props.lcsOrder && this.props.lcsOrder.table ?
						this.props.lcsOrder.table.order2 : null;
		}
		else{
			list_order = this.props.lcsOrder && this.props.lcsOrder.table ?
						JSON.parse(this.props.lcsOrder.table.order) : null;
			list_order2 = this.props.lcsOrder && this.props.lcsOrder.table ?
						JSON.parse(this.props.lcsOrder.table.order2) : null;
		} 
		let changeQTY = this.props.changeQTY;
		let changeNote = this.props.changeNote;
		let call = this.props.call;
		let checkout = this.props.checkout;
		const scrollspy = {
			position: 'relative',
			height: '268px',
			overflow: 'auto',
		}
		let sum = 0;
		return (
			<div className="row pos">
				<div className="col-md-12 border border-success p-0 showOrder">
					<ul
						style={scrollspy}
						className="col-md-12 m-0 p-0 scrollbar-ripe-malinka order-result">
						{!checkout || checkout && checkout.checked == false ?
						
							(list_order && list_order.length > 0 ?
								<div className='pb-2 border-top-0 border-right-0 border-left-0 border border-success'>
									<p className='col-md-12 p-0'>
										{/* HƯỚNG DẪN KHÁCH HÀNG */}
										<small>
											<kbd className='col-md-12 p-0'>
												Bấm Order để được phục vụ món ăn hoặc khi thay đổi đơn.
											</kbd>
										</small>
									</p>
									{/* ĐÃ GỬI THÔNG BÁO */}
									<div className='text-right'>
										{/* <p>{sum}</p> */}
										{auth && auth.level == 3 ? 
											<input className='btn btn-primary p-0'
												id={tableID}
												onClick={this.Call}
												type='button'
												value='Order' />
										: ''}
										{auth && auth.level != 3 ? 
											<input className='btn btn-danger m-0 p-0'
												id={tableID}
												onClick={this.Checkout}
												type='button'
												value='Checkout' />
										: ''}
									</div>
								</div>
								: <li>chưa đặt món ăn</li>
							)
							: <li>Chưa đặt món ăn</li>}
						{/* FORM ORDER  */}
						{!checkout || checkout && checkout.checked == false ?
							(list_order ?
								list_order.map((food, index) => {
									return (
										<li className='row m-0 pt-1' key={index}>
											<div className='col-md-8 input-group m-0'>
												<div id={food.foodName} onClick={this.Called} className='w-25'>
													{list_order
														&& list_order2 ?
														(list_order2[index]
															&& food.foodName == list_order2[index].foodName ?
															<span className="input-group-text p-0">
																<i className="bi bi-check2"></i>
															</span>
															: <span className="input-group-text p-0 px-2">
																{index + 1}
															</span>)
														: <span className="input-group-text p-0 px-2">
															{index + 1}
														</span>}
												</div>
												<p className='m-0 border border-primary w-75'>{food.foodName}</p>
											</div>
											<div className='col-md-4 qty-del m-0'>
												{/* CHANGE QTY  */}
												<input className='col-md-12 border border-warning p-0'
													id={tableID}
													type="number"
													onChange={this.changeQTY}
													name={food.foodName}
													min="1"
													max="10"
													step="1"
													//HIỂN THỊ QTY
													// 1.HIỂN THỊ QTY VỪA THAY ĐỔI
													// 2.HIỂN THỊ QTY VỪA THAY ĐỔI KHÔNG CÙNG FOODNAME
													// 3.HIỂN THỤ QTY KHI LOAD TRANG
													value={changeQTY && changeQTY.checked == false ?
														(changeQTY
															&& changeQTY.table_id == tableID
															&& changeQTY.food_name == food.foodName ?
															changeQTY.qty
															: (changeQTY && changeQTY.table_id == tableID
																&& changeQTY.food_name != food.foodName ?
																changeQTY.lcs_order.order[index].qty
																: (changeQTY &&
																	changeQTY.table_id != tableID) ?
																	food.qty
																	: food.qty
															))
														: (changeQTY && changeQTY.checked == true ?
															''
															: food.qty)} />
												<input className='border-0 bg-danger text-light'
													id={tableID}
													name={food.foodName}
													type='button'
													onClick={this.FoodDlt}
													value='X' />
											</div>
											{/* CHANGE NOTE */}
											<div className='col-md-12'>
												<input className='col-md-12 border border-danger note p-0'
													type='text'
													id={tableID}
													onChange={this.onNote}
													name={food.foodName}
													placeholder="bạn có yêu cầu về món ăn này?"
													value={changeNote
														&& changeNote.checked == false ?
														(changeNote
															&& changeNote.table_id == tableID
															&& changeNote.food_name == food.foodName ?
															changeNote.note
															: (changeNote && changeNote.table_id == tableID
																&& changeNote.food_name != food.foodName ?
																changeNote.lcs_order.order[index].note
																: (changeNote
																	&& changeNote.table_id != tableID) ?
																	food.note
																	: food.note
															))
														: (changeNote && changeNote.checked == true ?
															''
															: food.note)} />
											</div>
											<div className='col-md-12'>
												{/* HIỂN THỊ PHẦN TỬ THAY ĐỔI CỦA ORDER */}
												{list_order2
													&& !changeQTY
													&& !changeNote
													&& JSON.stringify(list_order2) !== JSON.stringify(list_order) ?
													(list_order2[index] && food.foodName == list_order2[index].foodName ?
														<div className='row'>
															<span className='col-md-10 text-left'>
																{food.note == list_order2[index].note ?
																	''
																	: food.note}
															</span>
															<span className='col-md-2'>
																{food.qty - list_order2[index].qty == 0 ?
																	''
																	: food.qty - list_order2[index].qty}
															</span>
														</div>
														: '')
													: (list_order2
														&& changeQTY
														&& JSON.stringify(list_order2) !== JSON.stringify(changeQTY.lcs_order.order) ?
														(list_order2[index]
															&& changeQTY.food_name == list_order2[index].foodName ?
															<div className='row'>
																<span className='col-md-10 text-left'>
																	{changeQTY.note == list_order2[index].note ?
																		''
																		: changeQTY.note}
																</span>
																<span className='col-md-2'>
																	{changeQTY.qty - list_order2[index].qty == 0 ?
																		''
																		: changeQTY.qty - list_order2[index].qty}
																</span>
															</div>
															: <div className='row'>
																<span className='col-md-10 text-left'>
																	{list_order2[index]
																		&& changeQTY.lcs_order.order[index].note == list_order2[index].note ?
																		''
																		: (list_order2[index]
																			&& changeQTY.lcs_order.order[index].note != list_order2[index].note ?
																			changeQTY.lcs_order.order[index].note
																			: '')}
																</span>
																<span className='col-md-2'>
																	{list_order2[index]
																		&& changeQTY.lcs_order.order[index].qty - list_order2[index].qty == 0 ?
																		''
																		: (list_order2[index]
																			&& changeQTY.lcs_order.order[index].qty - list_order2[index].qty != 0 ?
																			changeQTY.lcs_order.order[index].qty - list_order2[index].qty
																			: '')}
																</span>
															</div>)
														: (list_order2
															&& changeNote
															&& JSON.stringify(list_order2) !== JSON.stringify(changeNote.lcs_order.order) ?
															(changeNote.food_name == list_order2[index].foodName ?
																<div className='row'>
																	<span className='col-md-10 text-left'>
																		{changeNote.note == list_order2[index].note ?
																			''
																			: changeNote.note}
																	</span>
																	<span className='col-md-2'>
																		{changeNote.qty - list_order2[index].qty == 0 ?
																			''
																			: changeNote.qty - list_order2[index].qty}
																	</span>
																</div>
																: <div className='row '>
																	<span className='col-md-10 text-left'>
																		{changeNote.lcs_order.order[index].note == list_order2[index].note ?
																			''
																			:changeNote.lcs_order.order[index].note}
																	</span>
																	<span className='col-md-2'>
																		{changeNote.lcs_order.order[index].qty - list_order2[index].qty == 0 ?
																			''
																			: changeNote.lcs_order.order[index].qty - list_order2[index].qty}
																	</span>
																</div>)
															: ''))
												}
											</div>
										</li>
									)
								})
								: ''
							)
							: ''}
					</ul>
				</div>
			</div>
		)
	}
}

const mapSTP = state => {
	return {
		lcsOrder: state.reducerMenu,
		changeQTY: state.reducerFood,
		changeNote: state.reducerFood,
		call: state.reducerNotification,
		confirm: state.reducerNotification,
		checkout: state.reducerFood,
	}
}

const mapDTP = (dispatch, props) => {
	return {
		actChangeQTY: (tableID, foodName, qty) => {
			dispatch(actions.changeQTY(tableID, foodName, qty));
		},
		actNote: (tableID, foodName, note) => {
			dispatch(actions.Note(tableID, foodName, note));
		},
		actCall: (tableID) => {
			dispatch(actions.Call(tableID));
		},
		actCheckout: (tableID) => {
			dispatch(actions.Checkout(tableID));
		}
	}
}

export default connect(mapSTP, mapDTP)(ShowOrder);