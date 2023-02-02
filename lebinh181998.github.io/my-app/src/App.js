import React, { Component } from 'react';
import { Link, Navigate} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Notification from './Components/Notification';

class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
        return (
            <div className="App">
                <Header/>
                {auth && auth.level != 3 ? <Notification/> : ''}
                {this.props.children}
            </div>
        )
    }
}
export default App;
