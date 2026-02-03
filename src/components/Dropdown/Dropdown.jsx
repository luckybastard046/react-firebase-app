import React, { useState, useRef, useEffect } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useClickOutside } from '@react-hooks-library/core'
import { signOut } from "firebase/auth";

import { UseAuth } from '../../context/AuthContext';
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import userImg from '../../assets/images/user.png';

import { BsInfoCircle } from "react-icons/bs";

import { toast } from "react-toastify";

import './Dropdown.scss';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { currentUser } = UseAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
        const fetchData = async () => {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setUsername(userSnap.data().username);
                setEmail(userSnap.data().email);
                setPassword(userSnap.data().password);
                setImage(userSnap.data().image);
            } else {
                toast.error('User data loading failed!');
                console.log('User data loading failed!');
            }
        };

        fetchData();
        }
    }, [currentUser]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

    const showPasswordInfo = () => {
        setShowPassword(!showPassword)
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate("/login");
            toast.success("User logout successfully!");
            console.log("User logout successfully!");
        } catch (error) {
            toast.success("User logout failed!");
            console.log(error);
        }
    };

    const ref = useRef(null);

    useClickOutside(ref, () => {
        setIsOpen(false);
    });

    if (!isOpen) return null;

    return (
        <div className="dropdown-content" ref={ref}>
            <div className="dropdown">
                <div className="dropdown-header">
                    <h4>Account: </h4>
                    <div className="dropdown-user">
                        {currentUser ? (
                            <div className="user">
                                <div className="user-img">
                                    {image ? (
                                        <img src={image} alt='' />
                                    ) : (
                                        <img src={userImg} alt='' />
                                    )}
                                </div>
                                <div className="user-details">
                                    <h4>Logged user: </h4>
                                    <div className="detail">
                                        {username ? (
                                            <><h5>Username:</h5> <span>{username}</span></>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="detail">
                                        {email ? (
                                            <><h5>Email:</h5> <span>{email}</span></>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="detail">
                                        {password ? (
                                            <div className="password-info"><h5>Password:</h5> <BsInfoCircle size={18} onClick={showPasswordInfo} style={{ cursor: 'pointer' }} /> {showPassword ? <span>{password}</span> : null}</div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                <div className="user-logout">
                                    <button className='btn btn-logout' onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="user">
                                <img src={userImg} alt='' />
                                <div className="user-navlinks">
                                    <NavLink className={({ isActive }) => (isActive ? "active-auth-link" : "not-active-auth-link")} to='/login'>Login</NavLink>
                                    <NavLink className={({ isActive }) => (isActive ? "active-auth-link" : "not-active-auth-link")} to='/register'>Register</NavLink>
                                </div>
                                <div 
                                    className="user-logged"
                                >
                                    <span>No user logged in!</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;