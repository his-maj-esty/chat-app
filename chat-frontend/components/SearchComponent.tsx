import React, { ChangeEvent, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { roomState } from '../states/roomState';
import { filteredRoomsState } from '../states/filteredRooms';

function SearchComponent() {
    const [filteredRooms, setFilteredRooms] = useRecoilState(filteredRoomsState);
    const rooms = useRecoilValue(roomState);

    function handleSearch (e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;

    const filteredData = rooms.filter(room =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRooms(filteredData);
  };    
  return (
    <div className="flex w-full space-x-1 items-center drop-shadow-lg">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div className=" w-full">
        <input
          className="border-2 border-black rounded-3xl w-full px-4 py-1"
          onChange={handleSearch}
        ></input>
      </div>
    </div>
  );
}

export default SearchComponent