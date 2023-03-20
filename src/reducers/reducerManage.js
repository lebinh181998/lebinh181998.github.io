import * as types from '../consts/ActionTypes';
import axios from 'axios';

var initialState ={
    menu: [],
    employees: [],
    orders:[],
    employee: null,
    food: null,
    toggleAddFood: false,
    toggleEditFood: false,
    toggleAddEmployee: false,
    toggleEditEmployee: false,
};

var lcs = localStorage;

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        //EMPLOYEE MANAGE
        //DỮ LIỆU NHÂN VIÊN
        case types.GET_EMPLOYEES:
            state = {
                ...state,
                employees: action.employees,
            }
            return state;
        //DỮ LIỆU CỦA 1 NHÂN VIÊN  
        case types.GET_EMPLOYEE:
        state = {
            ...state,
            employee: action.employee,
        }
        return state;
        //ẨN HIỆN FORM ADD NHÂN VIÊN
        case types.TOGGLE_ADD_EMPLOYEE:
            state = {
                ...state,
                toggleAddEmployee: !state.toggleAddEmployee,
                toggleEditEmployee: false,
            }
            return state;
        //ẨN HIỆN FORM EDIT NHÂN VIÊN
        case types.TOGGLE_EDIT_EMPLOYEE:
            let employeeFlag = true;
            if(state.employee){
                if(state.employee[0].id != action.employeeID){
                    employeeFlag = false;
                }
            }
            if(employeeFlag == true){
                state = {
                    ...state,
                    toggleAddEmployee: false,
                    toggleEditEmployee: !state.toggleEditEmployee,
                }
            }
            else{
                state = {
                    ...state,
                    toggleAddEmployee: false,
                    toggleEditEmployee: true,
                }
            }
            return state;
        //MENU MANAGE
        //DATA MENU
        case types.GETMENU:
            state = {
                ...state,
                menu: action.menu,
            }
            return state;
        //DATA 1 MÓN ĂN  
        case types.GETFOOD:
            state = {
                ...state,
                food: action.food,
            }
            return state;
        //ẨN HIỆN FORM ADD MÓN ĂN
        case types.TOGGLE_ADDFOOD:
            state = {
                ...state,
                toggleAddFood: !state.toggleAddFood,
                toggleEditFood: false,
            }
            return state;
        //ẨN HIỆN FORM EDIT MÓN ĂN
        case types.TOGGLE_EDITFOOD:
            let flag = true;
            if(state.food){
                if(state.food[0].id != action.foodID){
                    flag = false;
                }
            }
            if(flag == true){
                state = {
                    ...state,
                    toggleAddFood: false,
                    toggleEditFood: !state.toggleEditFood,
                }
            }
            else{
                state = {
                    ...state,
                    toggleAddFood: false,
                    toggleEditFood: true,
                }
            }
            return state;
        //ORDERS MANAGE
        //DATA ORDERS
        case types.GET_ORDERS:
            state = {
                ...state,
                orders: action.orders,
            }
            return state;
        default:
            return state;
    }
}
export default myReducer;