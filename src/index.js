import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    BrowserRouter,
    Routes,
    Navigate,
  } from "react-router-dom";
import Table from './Components/Table';
import NotFound from './Components/NotFound';
import App from './App';
import { createStore } from 'redux';
import myReducer from './reducers/index';
import { Provider } from 'react-redux';
import Home from './Components/Home';
import Register from './Components/Account/Register';
import Login from './Components/Account/Login';
import Manage from './Components/Manage/Manage';
import MenuManage from './Components/Manage/Menu/MenuManage';
import EmployeeManage from './Components/Manage/Employee/EmployeeManage';
import OrdersManage from './Components/Manage/Orders.js/OrdersManage';

const store = createStore(myReducer);

// const router = createBrowserRouter([
    
//     {
//         path: "/",
//         element: <App/>,
//         // loader: async () => {
//         //     return fetch(`http://127.0.0.1:8000/api/table`);
//         // },
//     },
//     {
//         path: "/table",
//         element: <Table/>,
//     },
//     {
//         path: "/notfound",
//         element: <NotFound/>,
//     },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* <Provider store={store}>
            <RouterProvider  router={router} />
        </Provider> */}
        
        <Provider store={store}>
            <BrowserRouter>
                <App>
                    <Routes>
                        <Route exact path='/' element={<Home/>}/>
                        <Route path='/table' element={<Table/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/manage' element={<Manage/>}>
                            <Route path='menu' element={<MenuManage/>}/>
                            <Route path='employee' element={<EmployeeManage/>}/>
                            <Route path='orders' element={<OrdersManage/>}/>
                        </Route>
                        <Route path='*' element={<NotFound/>} />
                    </Routes>
                </App>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
