import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import RootWrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';

import Alert from '../../components/Alert/Alert';

import { UseAuth } from '../../context/AuthContext';
import { UseCart } from '../../context/CartContext';

import { motion } from 'framer-motion';

import './Checkout.scss';

const Checkout = () => {
    const navigate = useNavigate();
    const { currentUser } = UseAuth(); 
    
    const cartCtx = UseCart();
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalcode] = useState('');
    const [errors, setErrors] = useState([]);
    const [isVisible, setIsVisible] = useState([]);

    const validate = () => {
        let errorMessage = {};

        if (!name || name === "" || name.trim() === '' || name.length === 0 || name === null) {
            errorMessage.name = "Please enter fullname!";
        }

        if (!street || street === "" || street.trim() === '' || street.length === 0 || street === null) {
            errorMessage.street = "Please enter street!!";
        }

        if (!city || city === "" || city.trim() === '' || city.length === 0 || city === null) {
            errorMessage.city = "Please enter city!";
        }

        if (!postalCode || postalCode.trim() === '' || postalCode.length === 0 || postalCode === null) {
            errorMessage.postalCode = "Please enter postal code!";
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;            
    };


    const checkoutHandler = (event) => {
        event.preventDefault();
        validate();

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);
      
        setTimeout(() => {
            cartCtx.clearItem()
            navigate('/')
            alert('The order has been created!')
        }, 500);
    };

    return (
        <RootWrapper title='Checkout'>
            <motion.div
                className="checkout" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className='checkout-header'>
                    <p>Items in cart: <span>{numberOfCartItems}</span></p>
                    <p>Total price: <span>{totalAmount}</span></p>
                </div>
                <form className='checkout-form' onSubmit={checkoutHandler}>
                    <div className='group-item'>
                        <label htmlFor='name'>Your full name:</label>
                        <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                        {isVisible ? <Alert alertText={errors.name} /> : null}
                    </div>
                    <div className='group-item'>
                        <label htmlFor='street'>Street:</label>
                        <input type='text' id='street' value={street} onChange={(e) => setStreet(e.target.value)} />
                        {isVisible ? <Alert alertText={errors.street} /> : null}
                    </div>
                    <div className='group-item'>
                        <label htmlFor='postal'>Postal Code:</label>
                        <input type='text' id='postal' value={postalCode} onChange={(e) => setPostalcode(e.target.value)} />
                        {isVisible ? <Alert alertText={errors.postalCode} /> : null}
                    </div>
                    <div className='group-item'>
                        <label htmlFor='city'>City:</label>
                        <input type='text' id='city' value={city} onChange={(e) => setCity(e.target.value)} />
                        {isVisible ? <Alert alertText={errors.city} /> : null}
                    </div>
                    <div className='checkout-actions'>
                        <button type='button' className='btn-checkout-cancel' onClick={() => navigate('/cart')}>
                            Back
                        </button>
                        <button type='submit' className='btn-checkout-confirm'>Confirm</button>
                    </div>
                </form>
            </motion.div>
        </RootWrapper>
    );
};

export default Checkout;