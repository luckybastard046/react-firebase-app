import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UseAuth } from '../../../../context/AuthContext';
import { UseCart } from '../../../../context/CartContext';

import DropdownButton from '../../../../components/DropdownButton/DropdownButton';

import navLogo from '../../../../assets/logo/logo1.png';

import { GrShop } from 'react-icons/gr';

import './Desktop.scss';

function Desktop() {
    const { currentUser } = UseAuth(); 

    const cartCtx = UseCart();
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <nav className='nav-desktop'>
            <div className='nav-desktop-content'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={navLogo} alt='' />
                    </Link>
                </div>
                <ul className='nav-list'>
                    <li>
                        <NavLink 
                            to='/'
                            className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}
                        >home</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/shop'
                            className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}  
                        >shop</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/notes'
                            className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}  
                        >notes</NavLink>
                    </li>
                    <div style={{ borderRight: '1px dashed #333' }}> 
                        <li>
                            <NavLink 
                                to='/contact'
                                className={({ isActive }) => (isActive ? "active-link" : "not-active-link")}  
                            >contact</NavLink>
                        </li>
                    </div>
                    {currentUser && (
                        <li className='item-cart'>
                            <NavLink 
                                to='/cart'
                                className={({ isActive }) => (isActive ? "active-cart-link" : "not-active-cart-link")}
                            > 
                                <i><GrShop size={32} /></i>
                                <span className="cart-count">
                                    {numberOfCartItems}
                                </span>
                            </NavLink>
                        </li>
                    )}

                    <li className='item-account'>
                        <DropdownButton />
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Desktop;