import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

const menu = () => {
    return (
        <div className="Menu">           
            <NavLink to="/">ПОЧЕТНА</NavLink>
            <NavLink to="/register">РЕГИСТРУЈ СЕ</NavLink>
            <NavLink to="/login">ПРИЈАВИ СЕ</NavLink>
            <NavLink to="/medical">Медицинско особље</NavLink>
            <NavLink to="/admin">Администратори</NavLink>
            <NavLink to="/clinic">Клиника</NavLink>
        </div>
    )
};

export default menu;