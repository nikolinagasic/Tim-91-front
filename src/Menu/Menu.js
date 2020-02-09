import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';
import {UserContext} from '../UserProvider'

class Menu extends Component {
    static contextType = UserContext;
    
    showLogo = () => {
        document.getElementById("logo_img").style.visibility = "visible";
    }
    
    render(){
        return (
            <div className="Menu">           
                <a><NavLink to="/" onClick={this.showLogo}>ПОЧЕТНА</NavLink></a>
                <a className="logReg_click"><NavLink to="/register" onClick={this.showLogo}>РЕГИСТРАЦИЈА</NavLink></a>
                <a className="logReg_click"><NavLink to="/login" onClick={this.showLogo}>ПРИЈАВА</NavLink></a>
            </div>
        )
    }
};

export default Menu;