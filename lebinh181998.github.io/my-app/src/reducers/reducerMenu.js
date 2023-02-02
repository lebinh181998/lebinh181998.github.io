import { Action } from '@remix-run/router';
import * as types from '../consts/ActionTypes';

var initialState ={
    id: null,
    table: [],
    menu: [],
    toggleMenu: false,
    toggleOrder: false,
    active: false,
};

var lcs = localStorage;

var myReducer = (state = initialState, action) => {
    switch (action.type) {

        //CHANGE STATUS MENU
        case types.TOGGLE_MENU:
            state = {...state, 
                id : action.id ? action.id : state.id,
                toggleMenu: action.toggleMenu == 'false' ? true : false,
                toggleOrder: false,
            }
            return state;
        //LIST MENU
        case types.LIST_MENU:
            state = {...state, 
                menu: action.menu,
            }
            return state;
        //CHANGE STATUS ORDER
        case types.LIST_ORDER:
            state = {...state, 
                id : action.id ? action.id : state.id,
                table: action.data,
                toggleMenu: false,
                toggleOrder: action.toggleOrder == 'false' ? true : false,
            }
            return state;
        case types.ORDER:
            state = {...state, 
                table: lcs.getItem(action.id) ? JSON.parse(lcs.getItem(action.tableID)) : [],
                toggleMenu: false,
                toggleOrder: false,
            }
            return state;
        case types.RMFOOD:
            let getDLT = JSON.parse(lcs.getItem(action.tableID));
            let RMflag = true;
            getDLT.order.map((food, index)=>{
                if(!getDLT.order2[index] && action.foodName === food.foodName){
                    getDLT.order.splice(index, 1);
                    lcs.setItem(action.tableID, JSON.stringify(getDLT));
                    RMflag = false;
                }
            })
            if(RMflag) {
                alert('ĐỪNG LÀM NHƯ VẬY')
            }
            else {
                alert('Đã xoá');
            }
            state = {...state, 
                id : action.tableID,
                table: lcs.getItem(action.tableID) ? JSON.parse(lcs.getItem(action.tableID)) : [],
            }
            return state;
        default:
            return state;
    }
}
export default myReducer;