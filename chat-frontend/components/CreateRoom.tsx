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
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { roomState } from "../states/roomState";
import { filteredRoomsState } from "../states/filteredRooms";
import { Divide } from "lucide-react";

export function CreateRoom() {
  const [input, setInput] = useState("");
  const setFilteredRooms = useSetRecoilState(filteredRoomsState);
  const setRooms = useSetRecoilState(roomState);
  async function handleCreateRoom() {
    await axios.post(
      "http://localhost:80/createRoom",
      { roomName: input },
      {
        withCredentials: true,
      }
    );

    const res = await axios.get("http://localhost:80/getRooms", {
      withCredentials: true,
    });

    setRooms(res.data.data);
    setFilteredRooms(res.data.data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full p-2 w-fit text-white bg-gradient-to-tr from-[#784AF7] to-[#B748FE]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Create New Room</DialogTitle>
          <DialogDescription>
            Enter name for the new room below
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3 rounded-xl"
              onChange={(event) => setInput(event.target.value)}
              value={input}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#784AF7] to-[#B748FE] rounded-full text-white"
              onClick={() => handleCreateRoom()}
            >
              Create Room
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
