import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Wrapper from '../../../layout/Wrapper/RootWrapper/RootWrapper';

import Alert from '../../../components/Alert/Alert';

import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { UseAuth } from '../../../context/AuthContext';

import authImg from '../../../assets/images/auth.png';

import { BsShieldLockFill } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";

import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const { navigate, setLoading } = UseAuth()
;
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
    onAuthStateChanged(auth, data => {
        if(data){
            navigate('/notes')
            }
        })
    }, []);


    const [data, setData] = useState({
        email: '',
    });

    function handleChange(e){
            const {name, value} = e.target
            setData(prevData => ({
                ...prevData,
                [name]: value,
            })
        )
    }
     const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const user = await sendPasswordResetEmail(auth, data.email)
            .then(() => {
                toast.info('Password reset link sent!');
                console.log('Password reset link sent!');
                console.log(user);
            })
        }
        catch(err){
            if(err.code === "auth/invalid-email"){
                toast.error('Invalid or Incorrect email')
                console.log('Invalid or Incorrect email')
            }else if(err.code === 'auth/user-not-found'){
                toast.error('User not found!')
                console.log('User not found!')
            }else{
                console.log(err.code)
            }
        }
        setLoading(false)
    };

    return (
        <Wrapper title='Reset Password' icon={<BsShieldLockFill size={25} />}>
          <form className='auth-form' autoComplete='off' onSubmit={handleSubmit}>
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
                                onChange={(e) => handleChange(e)}
                                placeholder="Enter new password..."
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
      </Wrapper>
    );
}

export default ResetPassword;