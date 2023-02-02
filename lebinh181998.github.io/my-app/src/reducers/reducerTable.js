import * as types from '../consts/ActionTypes';

var initialState = {
    tables:[],
    order: [],
    order2: [],
    active: false,
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_TABLE:
            state = {
                ...state,
                tables: action.tables,
            }
            action.tables.map((table, index) => {
                if (!localStorage.getItem(table.id)) {
                    localStorage.setItem(table.id, JSON.stringify(state));
                }
            })
            return state;
        case types.TOGGLE_ACTIVE:
            let getActive = localStorage.getItem(action.id) ? JSON.parse(localStorage.getItem(action.id)) : null;
            if (getActive) {
                if(getActive.active == false){
                    getActive.active = true;
                    localStorage.setItem(action.id, JSON.stringify(getActive));
                    state = {
                        ...state,
                        active: true,
                    }
                }
            }
            return state;
        default:
            return state;

    }
}
export default myReducer;