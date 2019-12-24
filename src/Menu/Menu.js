import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

const menu = (props) => {
    console.log('usao u logout');
    const showLogo = () => {
        document.getElementById("logo_img").style.visibility = "visible";
    }

    const logout = () => {

    }

    return (
        <div className="Menu">           
            <a><NavLink to="/" onClick={showLogo}>ПОЧЕТНА</NavLink></a>
            <a className="logReg_click"><NavLink to="/register" onClick={showLogo}>РЕГИСТРУЈ СЕ</NavLink></a>
            <a className="logReg_click"><NavLink to="/login" onClick={showLogo}>ПРИЈАВИ СЕ</NavLink></a>
            <a id="click_logout"><NavLink to="/login" onClick={logout}>ОДЈАВИ СЕ</NavLink></a>
        </div>
    )
};

export default menu;