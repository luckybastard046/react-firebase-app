import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import WrapperAuth from '../../../layout/Wrapper/AuthWrapper/AuthWrapper';

import Alert from '../../../components/Alert/Alert';
import OAuth from '../../../components/OAuth/OAuth';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase/config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { LuEye, LuEyeOff } from "react-icons/lu";
import { BsShieldLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import { IoImageSharp } from "react-icons/io5";

import { toast } from 'react-toastify';

import '../Auth.scss';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    
    const navigate = useNavigate();   
    const dispatch = useDispatch();   

    const textPasswordShow = () => {
        setPasswordShow(passwordShow ? false : true);
    };

    const textConfirmPasswordShow = () => {
        setConfirmPasswordShow(confirmPasswordShow ? false : true);
    };

    const validate = () => {
        let errorMessage = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 
        const passwordRegexUpper = /^(?=.*[A-Z])/;
        const passwordRegexLower = /^(?=.*[a-z])/;
        const passwordRegexNum = /(?=.*\d)/;
        const passwordRegexChar = /(?=.*[@$!%*?&])/;

        if (!username || username === "" || username.trim() === '' || username.length === 0 || username === null) {
            errorMessage.username = "Please enter fullname!";
        }

        if (!email || email === "" || email.trim() === '' || email.length === 0 || email === null) {
            errorMessage.email = "Please enter email!";
        } else if (!emailRegex.test(email)) {
            errorMessage.email = "Please enter valid email!";
        }

        if (!image || image === "" || image.trim() === '' || image.length === 0 || image === null) {
            errorMessage.image = "Please add image!";
        }

        if (!password) {
            errorMessage.password = "Please enter password!";
        } else if (password === "" || password.trim() === '' || password.length === 0 || password === null) {
            errorMessage.password = "Please enter password!";
        } else if (password.length < 8) {
            errorMessage.password = "Password should be 8 chars long!";
        } else if (!passwordRegexUpper.test(password)) {
            errorMessage.password = "Password must have min 1 upper-case!";
        } else if (!passwordRegexLower.test(password)) {
            errorMessage.password = "Password must have min 1 lower-case!";
        } else if (!passwordRegexNum.test(password)) {
            errorMessage.password = "Password must have min 1 number!";
        } else if (!passwordRegexChar.test(password)) {
            errorMessage.password = "Password must have min 1 char!";
        } else if (password !== confirmPassword) {
            errorMessage.password = "Password don't match!";
            errorMessage.confirmPassword = "Password don't match!";
        }

        if (!confirmPassword || confirmPassword.trim() === '' || confirmPassword.length === 0 || confirmPassword === null) {
            errorMessage.confirmPassword = "Please enter confirm password!";
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;            
    }

    
    function handleImageChange(e) {
        console.log(e.target.files);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();
                   
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            console.log("Passwords do not match!");
        } else {
            try {
                setLoading(true);
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                await setDoc(doc(db, "users", userCredential.user.uid), {
                    username,
                    email,
                    password,
                    image,
                    createdAt: serverTimestamp(),
                });
                
                navigate('/');
                toast.success("User successfully registered!");
                console.log(userCredential);
            } catch (error) {
                if (error.code === 'auth/user-not-found') toast.error('No user found with this email!');
                else if (error.code === 'auth/wrong-password') toast.error('Wrong password!');
                else if (error.code === 'auth/invalid-credential') toast.error(`Sorry, but user don't exist!`);
                else if (error.code === 'auth/too-many-requests') toast.error('Too many requests. Try again later!');
                else if (error.code === 'auth/invalid-email') toast.error('Invalid email!');
                else if (error.code === 'auth/user-disabled') toast.error('User disabled!');
                else toast.error('User registration failed!');
            }
        }
    };

    return (
        <WrapperAuth title='Sign up' icon={<BsShieldLockFill size={25} />}>
            <motion.div
                className="contact" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <form className='auth-form' id='register' autoComplete='off' onSubmit={handleSubmit}>
                    <div class="auth-group">
                        <label>Name:</label>
                        <div className='group-items'>
                            <div className='group-items'>
                                <div className='icon'>
                                    <LuUser />
                                </div>
                                <input 
                                    name="username"
                                    id="username"
                                    type='text'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter name..."
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                        {isVisible ? <Alert alertText={errors.username} /> : null}
                    </div>
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
                        <label>Photo:</label>
                        <div className='group-items'>
                            <div className='group-items'>
                                <div className='icon'>
                                    <IoImageSharp />
                                </div>
                                <input 
                                    name="image"
                                    id="image"
                                    type="file"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        {isVisible ? <Alert alertText={errors.image} /> : null}
                    </div>
                    <div class="auth-group">
                        <label>Password:</label>
                        
                        <div>
                            <div className='group-items'>
                                <div className='icon'>
                                    <TbLockPassword />
                                </div>
                                <input 
                                    name="password"
                                    id="password"
                                    type={passwordShow ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password..."
                                    autoComplete='off'
                                />
                                <i onClick={textPasswordShow}>
                                    {(passwordShow ? false : true) ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </i>
                            </div>
                        </div>
                        {isVisible ? <Alert alertText={errors.password} /> : null}
                    </div>
                    <div class="auth-group">
                        <label>Confirm password:</label>
                        <div>
                            <div className='group-items'>
                                <div className='icon'>
                                    <TbLockPassword />
                                </div>
                                <input 
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type={confirmPasswordShow ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Enter confirm password..."
                                    autoComplete='off'
                                />
                                <i onClick={textConfirmPasswordShow}>
                                    {(confirmPasswordShow ? false : true) ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                                </i>
                            </div>
                        </div>
                        {isVisible ? <Alert alertText={errors.confirmPassword} /> : null}
                    </div>
                    <div className="submit-group">
                        <div className='submit-buttons'>
                            <button type="submit" className="btn btn-submit">Sign Up</button>
                            OR
                            <OAuth />
                        </div>
                        <div className='submit-content'>
                            <p>Have an account yet? <Link to='/login'>Sign In</Link></p>
                        </div>
                    </div>
                </form>
            </motion.div>
        </WrapperAuth>
    );
};

export default SignUp;