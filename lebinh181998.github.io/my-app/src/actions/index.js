import * as types from '../consts/ActionTypes';

export const Login = () =>{
    return {
        type: types.LOGIN,
    }
}
export const Logout = () =>{
    return {
        type: types.LOGOUT,
    }
}
export const LogForm = () =>{
    return {
        type: types.LOGFORM,
    }
}

export const GetOrders = (orders) =>{
    return {
        type: types.GET_ORDERS,
        orders,
    }
}

export const GetEmployees = (employees) =>{
    return {
        type: types.GET_EMPLOYEES,
        employees,
    }
}
export const GetEmployee = (employee) =>{
    return {
        type: types.GET_EMPLOYEE,
        employee
    }
}
export const ToggleAddEmployee = () =>{
    return {
        type: types.TOGGLE_ADD_EMPLOYEE,
    }
}
export const ToggleEditEmployee = (employeeID) =>{
    return {
        type: types.TOGGLE_EDIT_EMPLOYEE,
        employeeID
    }
}



export const GetMenu = (menu) =>{
    return {
        type: types.GETMENU,
        menu,
    }
}
export const GetFood = (food) =>{
    return {
        type: types.GETFOOD,
        food
    }
}
export const ToggleAddFood = () =>{
    return {
        type: types.TOGGLE_ADDFOOD,
    }
}
export const ToggleEditFood = (foodID) =>{
    return {
        type: types.TOGGLE_EDITFOOD,
        foodID
    }
}
export const listMenu = (menu) =>{
    return {
        type: types.LIST_MENU,
        menu
    }
}
export const toggleMenu = (id, toggleMenu) =>{
    return {
        type: types.TOGGLE_MENU,
        id,
        toggleMenu,
    }
}
export const lisOrder = (id, toggleOrder, data) =>{
    return {
        type: types.LIST_ORDER,
        id,
        toggleOrder,
        data
    }
}
export const ToggleActive = (id) =>{
    return {
        type: types.TOGGLE_ACTIVE,
        id,
    }
}
export const addFood = (foodID, foodName, tableID) =>{
    return {
        type: types.ADD_FOOD,
        foodID,
        foodName,
        tableID,
    }
}
export const changeQTY = (tableID, foodName, qty) =>{
    return {
        type: types.CHANGE_QTY,
        tableID,
        foodName,
        qty,
    }
}
export const Note = (tableID, foodName, note) =>{
    return {
        type: types.NOTE,
        tableID,
        foodName,
        note,
    }
}
export const Call = (tableID) =>{
    return {
        type: types.CALL,
        tableID,
    }
}
export const Order = (tableID) =>{
    return {
        type: types.ORDER,
        tableID,
    }
}
export const Confirm = (tableID) =>{
    return {
        type: types.CONFIRM,
        tableID
    }
} 
export const RMFood = (tableID, foodName) =>{
    return {
        type: types.RMFOOD,
        tableID,
        foodName,
    }
} 
export const Checkout = (tableID) =>{
    return {
        type: types.CHECKOUT,
        tableID,
    }
}
export const listTable = (tables) =>{
    return {
        type: types.LIST_TABLE,
        tables,
    }
}