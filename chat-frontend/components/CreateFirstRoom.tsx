import React from "react";

function CreateFirstRoom() {
  return (
    <div className="text-gray-600 flex items-center text-sm space-x-2 justify-center mt-9">
      <div> Create your first room. Click </div>
      <div className="rounded-full p-2 w-fit text-white bg-gradient-to-tr from-[#784AF7] to-[#B748FE]">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path
              fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div>above</div>
    </div>
  );
}

export default CreateFirstRoom;
