import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import { UseAuth } from '../../context/AuthContext';
import { UseCart } from '../../context/CartContext';

import RootWrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';
import CartItem from './CartItem/CartItem';
import CartModal from './CartModal/CartModal';
import Checkout from '../Checkout/Checkout';

import './Cart.scss';

const Cart = () => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const navigate = useNavigate();

    const cartCtx = UseCart();
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemoveHandler = (id) => {
      cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
      cartCtx.addItem({ ...item, amount: 1 });
    };

    function closeCartModal() {
      setIsCartModalOpen(false);
    }

    const handleShowCartModal = () => {
      setIsCartModalOpen(true);
    };

    return (
      <RootWrapper title='cart'>
        {cartCtx.items.length === 0 ? (
            <motion.div
                className="cart-empty" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >Your cart is empty!</motion.div>
        ) : (
            <motion.div 
                className="cart" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
              <div>
                <CartModal 
                  isCartModalOpen={isCartModalOpen} 
                  setIsCartModalOpen={setIsCartModalOpen} 
                  onClose={closeCartModal} 
                />
              </div>
              <ul className='cart-items'>
                {cartCtx.items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    name={item.name}
                    image={item.image}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                  />
                ))}
              </ul>
              <button className='btn-checkout' onClick={handleShowCartModal}>Go to Checkout</button>
              <div className='cart-total'>
                <div>Total Amount </div>
                <div style={{ color: 'brown' }}>{totalAmount}</div>
              </div>
              <div className='cart-checkout'>
                {isCheckout && (
                  <Checkout />
                )}
              </div>
            </motion.div>
        )}
      </RootWrapper>
    );
};

export default Cart;