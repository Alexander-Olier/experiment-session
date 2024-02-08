'use client'
import React, { useContext } from 'react'
import Configuration from './components/Configuration'
import Video from './components/Video';
import { AppContextType, RoomContext } from '@/context/RoomContext';

export default function Index() {
    const { stream, ws, me } = useContext(RoomContext) as AppContextType;
    const joinRoom = () => {
        ws.emit('create-room', { peerId: me?.id })
    };
    return (
        <main className="h-screen flex items-center justify-center bg-gray-50">
            {/* Navbar */}
            <div className="fixed w-full h-14 bg-blue-950 top-0"></div>
            <div className="w-[709px] bg-gray-100 rounded-lg shadow-lg p-4">
                {/* video */}
                <div className="relative w-full h-[419px]">
                    {stream && <Video stream={stream} />}
                    <div className="absolute bottom-0 w-full flex justify-center gap-[50px]">
                        {/* configuration */}
                        <Configuration />
                        <button onClick={() => joinRoom()} className='bg-red-700 text-white text-sm font-medium px-2 rounded-lg h-full hover:bg-red-600 focus:bg-red-900'>
                            Join Meeting
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};