import * as types from '../consts/ActionTypes';

var initialState = {
    table_id : null,
    food_name: null,
    qty: null,
    note : null,
    lcs_order: null,
    lcs_order2: null,
    checked: false,
};

var lcs = localStorage;
var auth = lcs.getItem('auth') ? JSON.parse(lcs.getItem('auth')) : null;

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        //THÊM FOOD VÀO ORDER
        case types.ADD_FOOD:
            let tableID = action.tableID;
            let foodName = action.foodName;
            let foodID = action.foodID;
            let flag = true;
            let getTable = JSON.parse(lcs.getItem(tableID));
            let newAddFood = {
                foodID: Number(foodID),
                foodName: foodName,
                note: '',
                qty: 1,
            }
            getTable.order.map((food, index)=>{
                if(food.foodName == foodName){
                    food.qty += 1;
                    lcs.setItem(tableID, JSON.stringify(getTable));
                    flag = false;
                }
            })
            if(flag){
                getTable.order.push(newAddFood);
                lcs.setItem(tableID, JSON.stringify(getTable));
            }
            return state;
        //CHANGE QTY
        case types.CHANGE_QTY:
            let getQTY = JSON.parse(lcs.getItem(action.tableID));
            let note = '';
            if(auth && auth.level != 3) {
                alert('CẮN RỨT LƯƠNG TÂM ĐI')
            }
            else {
                getQTY.order.map((food, index)=>{
                    if(food.foodName == action.foodName){
                        note = food.note;
                        food.qty = Number(action.qty);
                        lcs.setItem(action.tableID, JSON.stringify(getQTY));
                    }
                });
                state = {...state, 
                    table_id : action.tableID,
                    food_name: action.foodName,
                    qty: Number(action.qty),
                    note : note,
                    lcs_order: JSON.parse(lcs.getItem(action.tableID)),
                    lcs_order2: JSON.parse(lcs.getItem(action.tableID)).order2,
                    checked: false,
                }
            }
            return state;
        //CHAGNE NOTE
        case types.NOTE:
            let getNote = JSON.parse(lcs.getItem(action.tableID));
            let qty = 0;
            getNote.order.map((food, index)=>{
                if(food.foodName == action.foodName){
                    food.note = action.note;
                    qty = food.qty;
                    lcs.setItem(action.tableID, JSON.stringify(getNote));
                }
            })
            state = {...state, 
                table_id : action.tableID,
                food_name: action.foodName,
                note: action.note,
                qty : qty,
                lcs_order: JSON.parse(lcs.getItem(action.tableID)),
                lcs_order2: JSON.parse(lcs.getItem(action.tableID)).order2,
                checked: false,
            }
            return state;
        //CHECKOUT
        case types.CHECKOUT:
            let getCheckout = JSON.parse(lcs.getItem(action.tableID));
            getCheckout.order = [];
            getCheckout.order2 = [];
            getCheckout.active = false;
            lcs.setItem(action.tableID, JSON.stringify(getCheckout));
            state = {...state, 
                table_id : action.tableID,
                checked: true,
            }
            alert('đã thanh toán');
            return state;
        default:
            return null;
    }
}
export default myReducer;