import * as types from '../consts/ActionTypes';

var initialState = {
    loginSTT: localStorage.getItem('auth') ? true : false,
    logFormSTT: false,
};

var lcs = localStorage;

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        //CHANGE STATUS MENU
        case types.LOGIN:
            state = {
                ...state,
                loginSTT: true,
            }
            return state;
        case types.LOGOUT:
            let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
            if(auth.level == 3){
                localStorage.removeItem(auth.tableID);
            }
            localStorage.removeItem('auth');
            localStorage.removeItem('token');
            state = {
                ...state,
                loginSTT: false,
            }
            return state;
        case types.LOGFORM:
            state = {
                ...state,
                logFormSTT: !state.logFormSTT,
            }
            return state;
        default:
            return state;

    }
}
export default myReducer;