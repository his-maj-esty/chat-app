import React from 'react'
import { Login } from './Login';
import { Register } from './Register';

function NavBar() {
  return (
    <div className='sticky top-0 z-50 flex justify-between w-full px-8 py-3 bg-gray-100'>
      <div>Chat App</div>
      <div className='flex space-x-3'>
        <div><Login /></div>
        <div><Register /></div>
      </div>
    </div>
  );
}

export default NavBar;