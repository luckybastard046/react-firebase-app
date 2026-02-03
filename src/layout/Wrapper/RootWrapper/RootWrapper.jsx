import React from "react";

import logo from '../../../assets/logo/logo-404.png';
import logo2 from '../../../assets/logo/logo-text.png';

import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";

import "./RootWrapper.scss";

const RootWrapper = ({ children, title, icon }) => {
  return (
    <div className="wrapper">
      <div className="wrapper-content">
        <div className="logo">
            <img src={logo} alt='' />
        </div>
        <div className="header">
          <div className='title'>
            <h1>{title}</h1>
            <i>{icon}</i>
          </div>
          <main className="content">
            {children}
          </main>
        </div>
        <div style={{ marginTop: '100px' }}>
            <div>
              <MdKeyboardDoubleArrowUp color="brown" />
            </div>
            <img src={logo2} alt='' style={{ borderTop: '1px dashed brown', borderBottom: '1px dashed brown', padding: '5px' }} />
            <div>
              <MdKeyboardDoubleArrowDown color="brown" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default RootWrapper;