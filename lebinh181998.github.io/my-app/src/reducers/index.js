import { combineReducers } from "redux";
import reducerMenu from './reducerMenu';
import reducerTable from './reducerTable';
import reducerFood from './reducerFood';
import reducerNotification from './reducerNotification';
import reducerAccount from './reducerAccount';
import reducerManage from './reducerManage';

const myReducer = combineReducers({
    reducerMenu,
    reducerTable,
    reducerFood,
    reducerNotification,
    reducerAccount,
    reducerManage,
});




export default myReducer;