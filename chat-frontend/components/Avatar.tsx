import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as React from "react";

function Avt({ name }: { name: string }) {
  return <div className="w-fit rounded-full bg-purple-500 hover:ring-2 hover:ring-purple-500">{name[0]}</div>;
}

export default Avt;
