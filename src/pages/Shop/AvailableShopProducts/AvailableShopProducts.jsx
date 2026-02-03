import React from 'react';
import ShopItem from '../ShopItem/ShopItem';

import './AvailableShopProducts.scss';

const DUMMY_PRODUCTS = [
  {
    id: 'm1',
    name: 'Quattro formaggi',
    description: '4 types of cheese',
    image: 'https://www.italianstylecooking.net/wp-content/uploads/2020/04/Pizza-quattro-formaggi-neu.jpg',
    price: 10.99,
  },
  {
    id: 'm2',
    name: 'Margherita',
    description: 'A german specialty!',
    image: 'https://th.bing.com/th/id/R.3c71c9f88404d4af8409f8e6bfdb02df?rik=%2fh3UGn8RbUuOgw&pid=ImgRaw&r=0',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Salami',
    description: 'American, raw, meaty',
    image: 'https://tse3.mm.bing.net/th/id/OIP.9vH8z_dg7WgcXJisy30NhQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Hawai',
    description: 'Healthy...and green...',
    image: 'https://th.bing.com/th/id/OIP.fe50rxvAAhpsPxH5bj867QHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: 18.99,
  },
];

const AvailableShopProducts = () => {
  return (
    <div className='available-shop-products'>
      {DUMMY_PRODUCTS.map((item) => (
         <ShopItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default AvailableShopProducts;