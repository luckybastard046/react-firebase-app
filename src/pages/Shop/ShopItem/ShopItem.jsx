import React from 'react';
import { UseCart } from '../../../context/CartContext';

import ShopForm from '../ShopForm/ShopForm';

import './ShopItem.scss';

const ShopItem = (props) => {
  const cartCtx = UseCart();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      image: props.image,
      amount: amount,
      price: props.price
    });
  };

  return (
    <li className='shop-item'>
      <div className='shop-item-details'>
        <h3>{props.name}</h3>
        <img src={props.image} alt='' />
        <div className='description'>{props.description}</div>
        <div className='price'>{price}</div>
        <div>
          <ShopForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
      </div>
    </li>
  );
};

export default ShopItem;