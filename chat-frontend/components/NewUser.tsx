import React from 'react'

function NewUser({ sender }: { sender: string }) {
  console.log("sender",sender);
  return (
    <div className="w-full mt-10">
      <div className="mx-16 bg-gray-200 text-center text-xs rounded-xl py-1 text-gray-600">
        <span>{sender.split("@")[0]} joined the chat</span>
      </div>
    </div>
  );
}

export default NewUser;