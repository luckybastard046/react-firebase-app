import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { motion } from 'framer-motion';

import Wrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';

import { PiArrowFatLineRight } from "react-icons/pi";

import logo from '../../assets/logo/logo-404.png';
import logo2 from '../../assets/logo/logo-text.png';

import './PageNotFound.scss';


const PageNotFound = () => {
    const location = useLocation();

    return (
        <Wrapper title='Page Not Found'>
            <motion.div 
                className="shop" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className='page-not-found'>
                    <div className='content'>
                        <p>We're sorry, something went wrong. If the error persists, please contact your website provider.</p>
                    </div>
                </div>
            </motion.div>
            
        </Wrapper>
    );
}

export default PageNotFound;