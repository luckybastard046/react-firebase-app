import React from 'react';

import { motion } from 'framer-motion';

import Wrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';

import homeImg from '../../assets/images/shop2.jpg';

import './Home.scss';

const Home = () => {
    return (
        <Wrapper title="Home">
            <motion.div 
                className="cart" 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className='home'>
                    <p>
                        I'm not telling you to be paranoid. But being at least a little paranoid means pushing yourself beyond your current limits!<br />
                        If you want to learn how to use your creation, sign up.<br/>
                        <br/>
                        I'm not actually doing anything special, I'm just fighting against the <span className='stigma'>stigma of mental disorders</span> and I shatter myths.<br />
                    </p>
                    <p>Have a good day!</p>
                </div>
            </motion.div>
        </Wrapper>
    );
}

export default Home;