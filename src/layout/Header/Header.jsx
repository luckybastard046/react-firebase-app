import React, { useEffect, useState } from 'react';

import Desktop from './Navs/Desktop/Desktop';
import Mobile from './Navs/Mobile/Mobile';

import { toast } from 'react-toastify';

import './Header.scss';

const Header = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1030);
    useEffect(() => {
      const handleResize = () => setIsDesktop(window.innerWidth >= 1030);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


    const [isTablet, setIsTablet] = useState(window.innerWidth <= 1030);
    useEffect(() => {
      const handleResize = () => setIsTablet(window.innerWidth <= 1030);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <header>
        <div className='header'>
            <div className='header-nav'>
                {isDesktop && <Desktop />}
                {isTablet && <Mobile />}
            </div>
        </div>
      </header>
    );
}

export default Header;