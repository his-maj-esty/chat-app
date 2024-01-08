import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import { extractCookie } from "../../utils/extract-cookie";
import { userState } from "../states/userState";
import { useRecoilState } from "recoil";
import axios from "axios";
import Avt from "./Avatar";
import LoginAgain from "./LoginAgain";
import { cookieErrorState } from "../states/cookieErrorState";

function NavBar() {
  const [user, setUser] = useRecoilState(userState);
  const [cookieError, setCookieError] = useRecoilState(cookieErrorState);
  useEffect(() => {
    async function validateCookies() {
      try {
        const res = await axios.post(
          "/getDetails",
          {},
          { withCredentials: true }
        );
        setUser(res.data.data);
        setCookieError(false);
      } catch (error: any) {
        if (error.response.status === 440) {
          setCookieError(true);
        }
        console.log(error);
      }
    }
    validateCookies();
  }, []);

  function handleLogout(name: string) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/dashboard";
  }

  return (
    <div className="sticky top-0 z-50 flex justify-between w-full px-8 py-3 bg-gray-100">
      <div>Chat App</div>
      {user.email === "" && (
        <div className="flex space-x-3">
          <div>
            <Login />
          </div>
          <div>
            <Register />
          </div>
        </div>
      )}
      {user.email !== "" && (
        <button
          className="rounded-xl py-2 px-4 text-white bg-gradient-to-tr from-[#784AF7] to-[#B748FE]"
          onClick={() => handleLogout("details")}
        >
          Logout
        </button>
      )}
      {cookieError && <LoginAgain />}
    </div>
  );
}

export default NavBar;
