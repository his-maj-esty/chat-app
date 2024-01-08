import React from 'react'
import { Login } from './Login'
import { useSetRecoilState } from 'recoil';
import { cookieErrorState } from '../states/cookieErrorState';

function LoginAgain() {
    const setCookieError = useSetRecoilState(cookieErrorState);
    function handleClose() {
        setCookieError(false);
    }
  return (
    <div className="absolute flex justify-center h-screen items-center bg-transparent backdrop-blur-xl w-full">
      <div className="flex flex-col bg-gray-100 rounded-2xl">
        <button onClick={handleClose} className="flex justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 pt-3 pr-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col items-center space-y-2 p-10">
          <div className="text-xl font-bold">Your Session Expired.</div>
          <div>Login Again to continue</div>
          <div className="pt-7">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAgain