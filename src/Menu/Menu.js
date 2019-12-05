import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

const menu = () => {
    return (
        <div className="Menu">           
            <a><NavLink to="/">ПОЧЕТНА</NavLink></a>
            <a><NavLink to="/register">РЕГИСТРУЈ СЕ</NavLink></a>
            <a><NavLink to="/login">ПРИЈАВИ СЕ</NavLink></a>
            <a><NavLink to="/medical">Медицинско особље</NavLink></a>
        </div>
    )
};

export default menu;