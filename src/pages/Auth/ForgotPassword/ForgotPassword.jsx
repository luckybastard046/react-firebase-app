import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import Wrapper from '../../../layout/Wrapper/RootWrapper/RootWrapper';

import Alert from '../../../components/Alert/Alert';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/config';

import { BsShieldLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

import { toast } from 'react-toastify';

import '../Auth.scss'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let errorMessage = {};
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i; 

        if (!email || email === "" || email.trim() === '' || email.length === 0 || email === null) {
            errorMessage.email = "Please enter email!";
        } else if (!emailRegex.test(email)) {
            errorMessage.email = "Please enter valid email!";
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;            
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        validate();

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        try {
            await sendPasswordResetEmail(auth, email);
            navigate('/login')
            toast.success("Email sent For Password Reset!");
        } catch (error) {
            if (error.code === 'auth/user-not-found') toast.error('No user found with this email!');
            else if (error.code === 'auth/wrong-password') toast.error('Wrong password!');
            else if (error.code === 'auth/invalid-credential') toast.error(`Sorry, but user don't exist!`);
            else if (error.code === 'auth/too-many-requests') toast.error('Too many requests. Try again later!');
            else if (error.code === 'auth/invalid-email') toast.error('Invalid email!');
            else if (error.code === 'auth/user-disabled') toast.error('User disabled!');
            else toast.error('Email sent failed!');
        }
    };

    return (
        <Wrapper title='Forgot Password' icon={<BsShieldLockFill size={25} />}>
             <motion.div
                className="contact" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <form className='auth-form' autoComplete='off' onSubmit={handleForgotPassword}>
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
                    
                    <div className="submit-group">
                        <div className='submit-buttons'>
                            <button type="submit" className="btn btn-submit">Send Password</button>
                        </div>
                        <div className='submit-content'>
                            <p>Have an account yet? <Link to='/login'>Sign in</Link></p>
                        </div>
                    </div>
                </form>
            </motion.div>
      </Wrapper>
    );
}

export default ForgotPassword;