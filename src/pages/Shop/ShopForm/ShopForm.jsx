import React, { useRef } from 'react';

import { toast } from 'react-toastify';

import './ShopForm.scss';

const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber =+ enteredAmount;

    try {
      props.onAddToCart(enteredAmountNumber);
      toast.success('Item add to cart!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='shop-form' onSubmit={submitHandler}>
      <input
        className='input'
        ref={amountInputRef}
        id={props.id}
        type='number'
        min='1'
        max= '5'
        step= '1'
        defaultValue='1'
      />
      <button className='btn-shop-add'>Add</button>
    </form>
  );
};

export default MealItemForm;