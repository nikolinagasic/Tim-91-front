import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

const menu = () => {
    const showLogo = () => {
        document.getElementById("logo_img").style.visibility = "visible";
    }

    return (
        <div className="Menu">           
            <a><NavLink to="/" onClick={showLogo}>ПОЧЕТНА</NavLink></a>
            <a><NavLink to="/register" onClick={showLogo}>РЕГИСТРУЈ СЕ</NavLink></a>
            <a><NavLink to="/login" onClick={showLogo}>ПРИЈАВИ СЕ</NavLink></a>
            <a><NavLink to="/admin">Admin</NavLink></a>
        </div>
    )
};

export default menu;