import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UseAuth } from '../../../../context/AuthContext';
import { UseCart } from '../../../../context/CartContext';

import Hamburger from 'hamburger-react';

import DropdownButton from '../../../../components/DropdownButton/DropdownButton';

import Sidebar from '../../../Sidebar/Sidebar';

import { GrShop } from 'react-icons/gr';

import navLogo from '../../../../assets/logo/logo1.png';

import './Mobile.scss';

function Mobile() {
    const [isOpen, setOpen] = useState(false);

    const { currentUser } = UseAuth(); 

    const cartCtx = UseCart();
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <nav className='nav-mobile'>
            <div className='nav-mobile-content'>
                <div className='logo'>
                    <Link to='/'>
                        <img src={navLogo} alt='' />
                    </Link>
                </div>
                <ul className='nav-mobile-list'>
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
                    <li className={isOpen ? "item-active-hamburger" : "item-not-active-hamburger"}>
                        <Hamburger toggled={isOpen} toggle={setOpen} size={30} />
                    </li>
                    <li className='item-account'>
                        <DropdownButton />
                    </li>
                </ul>
            </div>
            <Sidebar isOpen={isOpen} />
        </nav>
    );
}

export default Mobile;