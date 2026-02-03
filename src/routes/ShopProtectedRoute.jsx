import React, { useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

import { UseAuth } from '../context/AuthContext';

import { motion } from 'framer-motion';

import Spinner from "../components/Spinner/Spinner";
import Wrapper from "../layout/Wrapper/RootWrapper/RootWrapper";

import './ShopProtectedRoute.scss';

export const NotShopProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/login');
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
      <Wrapper title='Shop'>
        <motion.div 
                className="shop" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
              <div className='shop-protected'>
                <div className='content'>
                  <p>We're sorry, but access to shopping page must be logged in!</p>
                </div>
              </div>
            </motion.div>
      </Wrapper>
    );
};

const ShopProtectedRoute = () => {
  const { currentUser, loading } = UseAuth();

  if (loading) {
    return <Spinner />
  }

  if (currentUser) {
    return <Outlet />
  }

  return <NotShopProtectedRoute />;
};

export default ShopProtectedRoute;