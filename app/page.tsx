'use client'
import { useContext } from "react";
import { AppContextType, RoomContext } from "@/context/RoomContext";

export default function Home() {
  const { ws, me } = useContext(RoomContext) as AppContextType;
  const joinRoom = () => {
    ws.emit('create-room', { peerId: me?.id })
  };
  return (
    <button onClick={() => joinRoom()} className='bg-red-700 text-white text-sm font-medium px-2 rounded-lg h-full hover:bg-red-600 focus:bg-red-900'>
      Join Meeting
    </button>
  )
}