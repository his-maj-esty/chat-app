import React, { useState } from "react";

import { Button } from "../shad/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../shad/components/ui/dialog";
import { Input } from "../shad/components/ui/input";
import { Label } from "../shad/components/ui/label";
import axios, { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { cookieErrorState } from "../states/cookieErrorState";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setCookieError = useSetRecoilState(cookieErrorState);

  async function handleLogin(event: any) {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:80/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      window.location.replace("http://localhost:5173/dashboard");
      setCookieError(false);
    } catch (error: any) {
      if (error.response.status === 404) {
        setError("user doesn't exist. Please signup");
      }
      if (error.response.status === 401) {
        setError("incorrect password");
      }
      setCookieError(true);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl py-2 px-4 text-white bg-gradient-to-tr from-[#784AF7] to-[#B748FE]">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={handleLogin} className="group">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Enter your details below</DialogDescription>
            {error && <span className=" text-red-400 text-sm">{error}</span>}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="Email"
                className="col-span-3 rounded-xl invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                placeholder=" "
                required
              />
              <span className="text-red-400 col-start-2 col-end-4 text-sm invisible peer-[&:not(:placeholder-shown):not(:focus):invalid]:visible">
                Enter valid email
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3 rounded-xl invalid:border-red-400"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#784AF7] to-[#B748FE] rounded-full text-white group-invalid:pointer-events-none group-invalid:opacity-30"
            >
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
