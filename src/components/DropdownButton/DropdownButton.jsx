import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { UseAuth } from '../../context/AuthContext';

import Dropdown from "../Dropdown/Dropdown";

import userImg from '../../assets/images/user.png';

import { FaUser } from "react-icons/fa";

import './DropdownButton.scss';

const DropdownButton = ({ isOpen, setIsOpen }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { currentUser } = UseAuth();

    return (
        <div className="dropdown-button">
            {currentUser ? (
                <div onClick={() => setShowDropdown((prev) => !prev)}>
                    <NavLink to={isOpen} className={({ isActive }) => (isActive ? "active-user-img" : "not-active-user-img")}><img src={userImg} alt='' style={{ height: '40px' }} /></NavLink>
                </div>
            ) : (
                <div onClick={() => setShowDropdown((prev) => !prev)}>
                    <NavLink to={isOpen} className={({ isActive }) => (isActive ? "active-user" : "not-active-user")}><FaUser size={30} /></NavLink>
                </div>
            )}
            <div className="dropdown-show">
                {showDropdown && (
                    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}  />
                )}
            </div>
        </div>
    );
};

export default DropdownButton;