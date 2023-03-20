import * as types from '../consts/ActionTypes';

var initialState = {
    tableID : null,
    lcs_order2: null,
    count: null,
};

var lcs = localStorage;

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        //GỬI THÔNG BÁO
        case types.CALL:
            let getCount = 0;
            let getOrder = JSON.parse(lcs.getItem(action.tableID));
            let OrderFlag = true;
            if(JSON.stringify(getOrder.order) !== JSON.stringify(getOrder.order2)){
                getOrder.status = true;
                lcs.setItem(action.tableID, JSON.stringify(getOrder));
                OrderFlag = false;
            }
            for(var i = 0; i < localStorage.length; i++) {
                let table = JSON.parse(localStorage.getItem(localStorage.key(i)));
                if (table && table.status == true) {
                    getCount += 1;
                }
            };
            if(OrderFlag){
                alert('vui lòng chờ...');
            }
            else {
                alert('Đã gọi...');
            }
            state = {...state, 
                tableID : action.tableID,
                count: getCount,
            }
            return state;
        //XÁC NHẬN THÔNG BÁO
        case types.CONFIRM:
            let table = [];
            let count = 0;
            for (var i = 0; i < localStorage.length; i++) {
                table = JSON.parse(localStorage.getItem(localStorage.key(i)))
                if (action.tableID == localStorage.key(i)) {
                    table.status = false;
                    table.order2 = table.order;
                    lcs.setItem(action.tableID, JSON.stringify(table));
                }
                else{
                    if(table && table.status == true){
                        count += 1;
                    }
                }
            };
            state = {...state, 
                tableID : action.tableID, 
                lcs_order2: JSON.parse(localStorage.getItem(action.tableID)).order2,
                count : count}
            return state;
        default:
            return state;
    }
}
export default myReducer;