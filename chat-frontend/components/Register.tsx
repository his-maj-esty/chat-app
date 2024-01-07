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
import { roomState } from "../states/roomState";
import { filteredRoomsState } from "../states/filteredRooms";
import { Divide } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { response } from "express";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(event: any) {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:80/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      window.location.replace("http://localhost:5173/dashboard");
    } catch (error: any) {
      if (error.response.status === 409) {
        setError("user already registered.");
        console.log("smae mainl");
      }
    }
  }

  return (
    <Dialog>
      <Toaster position="top-center" reverseOrder={false} />
      <DialogTrigger asChild>
        <Button className="rounded-xl p-2 text-white bg-gradient-to-tr from-[#784AF7] to-[#B748FE]">
          Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <form onSubmit={handleRegister} className="group">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>Enter your details below</DialogDescription>
            {error && <span className=" text-red-400 text-sm">{error}</span>}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                id="firstname"
                className="col-span-3 rounded-xl"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastname"
                className="col-span-3 rounded-xl"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
                required
              />
            </div>
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
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
