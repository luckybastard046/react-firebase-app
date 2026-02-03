import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sidebarLogo from '../../assets/logo/logo2.png';

import './Sidebar.scss';

const Sidebar = ({ isOpen }) => {
    return (
        <div className='sidebar-layout'>
            <div className='sidebar' style={{ 
                    width: isOpen ? "230px" : "0px",
                    opacity: isOpen ? "1" : "0",
                    transition: isOpen ? ".3s all" : ".3s all"
                }}>
                <div className="top-sidebar">
                    <div className="logo">
                        <img src={sidebarLogo} alt='' style={{ 
                            opacity: isOpen ? "1" : "0",
                        }}/>
                    </div>
                    <ul className="sidebar-list" style={{ 
                            opacity: isOpen ? "1" : "0",
                        }}>
                        <NavLink to='/' className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}>home</NavLink>
                        <NavLink to='/shop' className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}>shop</NavLink>
                        <NavLink to='/notes' className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}>notes</NavLink>
                        <NavLink to='/contact' className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}>contact</NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;