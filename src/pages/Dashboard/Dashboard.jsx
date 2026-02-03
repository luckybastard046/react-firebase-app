import React from 'react';
import { useSelector } from 'react-redux';

import Wrapper from '../../layout/Wrapper/RootWrapper/RootWrapper';

import { toast } from 'react-toastify';

const Dashboard = () => {
    const { userInfo } = useSelector((state) => state.auth); 
  
    return (
      <Wrapper title='Dashboard'>
        <div className='dashboard'>
            <div style={{ marginTop: '10px' }}>
              {userInfo && userInfo.name ? (
                  <p>Welcome user: <b>{userInfo.name}</b></p>
              ) : (
                  <p><span style={{ color: 'red' }}>Username is wasn't be entered at registration!</span></p>
              )}
            </div>
            <p>Your email is: <b>{userInfo.email}</b></p>
            <p style={{ marginTop: '20px' }}>This is your protected dashboard.</p>  
        </div>
      </Wrapper>
    );
}

export default Dashboard;