import React from 'react';
import {NavLink} from 'react-router-dom';
import './Menu.css';

const menu = () => {
    return (
        <div className="Menu">           
            <a><NavLink to="/">POČETNA</NavLink></a>
            <a><NavLink to="/register">REGISTRUJ SE</NavLink></a>
            <a><NavLink to="/login">PRIJAVI SE</NavLink></a>
        </div>
    )
};

export default menu;