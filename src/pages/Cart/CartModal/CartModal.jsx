import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseAuth } from '../../../context/AuthContext';
import { UseCart } from '../../../context/CartContext';

import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/config';
import { signOut } from 'firebase/auth';

import Checkout from '../../Checkout/Checkout';

import { motion, AnimatePresence } from 'framer-motion';

import { IoMdClose } from "react-icons/io";

import { toast } from 'react-toastify';

import './CartModal.scss'

const CartModal = ({ isCartModalOpen, setIsCartModalOpen, onClose }) => {
    const navigate = useNavigate();

    const { currentUser } = UseAuth(); 

    const cartCtx = UseCart();
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}$`;
    
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (currentUser) {
        const fetchData = async () => {
            const userRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                setEmail(userSnap.data().email);
            } else {
                console.log('User data loading failed!');
            }
        };

        fetchData();
        }
    }, [currentUser]);

    const handleConfirmCartModal = () => {
        setIsCartModalOpen(false);
        setTimeout(() => {
            navigate('/checkout')
        }, 500);
    }

    if (!isCartModalOpen) return null;

    return (
        <AnimatePresence>
            {isCartModalOpen && (
                <>
                    <motion.div 
                        className="cart-modal-overlay" 
                        onClick={onClose}
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 100 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className='modal-btn'>
                                <button 
                                    className="btn-modal-close" 
                                    onClick={onClose}
                                ><IoMdClose size={20} /></button>
                            </div>
                            <div className='cart-modal-text'>
                                Dear user <span>{email}</span>, <br />
                                you have <span>{numberOfCartItems}</span> items in cart with total price <span>{totalAmount}</span>.
                                Do you want to proceed to checkout? <br />
                            </div>
                            <div className='cart-modal-actions'>
                                <button className='btn-cart-modal-cancel' onClick={() => setIsCartModalOpen(false)}>Cancel</button>
                                <button className='btn-cart-modal-confirm' onClick={handleConfirmCartModal}>Confirm</button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CartModal;