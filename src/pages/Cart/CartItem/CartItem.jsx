import React from "react";

import { UseCart } from "../../../context/CartContext";

import './CartItem.scss';

const CartItem = (props) => {
    const priceItem = `$${props.price.toFixed(2)}`;
    const cartCtx = UseCart();

   

    return (
      <li className='cart-item' key={props.id}>
        <h3>{props.name}</h3>
        <img src={props.image} alt="" />
        <div className='details'>
          <p className='price'>{priceItem}</p>
          <p className='amount'>x {props.amount}</p>
        </div>
        <div className='actions'>
          <button className='btn-cart-remove' onClick={props.onRemove}>−</button>
          <button className='btn-cart-add' onClick={props.onAdd}>+</button>
        </div>
      </li>
    );
};

export default CartItem;