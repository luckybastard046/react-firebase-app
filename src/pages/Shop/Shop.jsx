import React from 'react';

import { motion } from 'framer-motion';

import RootWrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';

import AvailableShopProducts from './AvailableShopProducts/AvailableShopProducts';
import ShopSummary from './ShopSummary/ShopSummary';

import './Shop.scss';

const Shop = () => {
    return (
        <RootWrapper title="Shop">
            <motion.div 
                className="shop" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <ShopSummary />
                <AvailableShopProducts />
            </motion.div>
        </RootWrapper>
    );
}

export default Shop;