import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { motion } from 'framer-motion';

import Alert from '../../../components/Alert/Alert';
import OAuth from '../../../components/OAuth/OAuth';

import WrapperAuth from '../../../layout/Wrapper/AuthWrapper/AuthWrapper';

import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../firebase/config';

import { LuEye, LuEyeOff } from "react-icons/lu";
import { BsShieldLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

import { toast } from 'react-toastify';

import '../Auth.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});

    const [isVisible, setIsVisible] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const textPasswordShow = () => {
        setPasswordShow(passwordShow ? false : true);
    };

    const validate = () => {
        let errorMessage = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 

        if (!email || email === "" || email.trim() === '' || email.length === 0 || email === null) {
            errorMessage.email = "Please enter email!";
        } else if (!emailRegex.test(email)) {
            errorMessage.email = "Please enter valid email!";
        }

        if (!password) {
            errorMessage.password = "Please enter password!";
        } else if (password === "" || password.trim() === '' || password.length === 0 || password === null) {
            errorMessage.password = "Please enter password!";
        } else if (password.length < 8) {
            errorMessage.password = "Password should be 8 chars long!";
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;            
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            await updateProfile(user.user, {
                displayName: user.username,
            });
            navigate("/");
            toast.success("User successfully logged in!");
            console.log(user);
        } catch (error) {
            if (error.code === 'auth/user-not-found') toast.error('No user found with this email!');
            else if (error.code === 'auth/wrong-password') toast.error('Wrong password!');
            else if (error.code === 'auth/invalid-credential') toast.error(`Sorry, but user don't exist!`);
            else if (error.code === 'auth/too-many-requests') toast.error('Too many requests. Try again later!');
            else if (error.code === 'auth/invalid-email') toast.error('Invalid email!');
            else if (error.code === 'auth/user-disabled') toast.error('User disabled!');
            else toast.error('User logged in failed!');

        }
    }

    return (
        <WrapperAuth title='Sign In' icon={<BsShieldLockFill size={25} />}>
            <motion.div
                className="contact" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <form className='auth-form' id='login' autoComplete='off' onSubmit={handleSubmit}>
                    <div class="auth-group">
                        <label>Email:</label>
                        <div className='group-items'>
                            <div className='group-items'>
                                <div className='icon'>
                                    <MdAlternateEmail />
                                </div>
                                <input 
                                    name="email"
                                    id="email"
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email..."
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        {isVisible ? <Alert alertText={errors.email} /> : null}
                    </div>
                    <div class="auth-group">
                        <label>Password:</label>
                        <div className='group-items'>
                            <div className='group-items'>
                                <div className='icon'>
                                    <TbLockPassword />
                                </div>
                                <input 
                                    type={passwordShow ? 'text' : 'password'}
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete='off'
                                    placeholder="Enter password..."
                                />
                                <i onClick={textPasswordShow}>
                                    {(passwordShow ? false : true) ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </i>
                            </div>
                        </div>
                        {isVisible ? <Alert alertText={errors.password} /> : null}
                    </div>
                
                    <div className="submit-group">
                        <div className='submit-buttons'>
                            <button type="submit" className="btn btn-submit">Sign In</button>
                            OR
                            <OAuth />
                        </div>
                        <div className='submit-content'>
                            <p>Still don't have an account? <Link to='/register'>Sign Up</Link></p>
                            <p><Link to='/forgot-password'>Forgot Password?</Link></p>
                        </div>
                    </div>
                </form>
            </motion.div>
        </WrapperAuth>
    );
};

export default SignIn;