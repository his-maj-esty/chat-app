import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as React from "react";

function Avt({ email }: { email: string }) {
  return (
    <Avatar>
      <AvatarImage src="../src/assets/react.svg" />
      <AvatarFallback>nn</AvatarFallback>
    </Avatar>
  );
}

export default Avt;
