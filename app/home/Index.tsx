'use client'
import React, { useContext } from 'react'
import Configuration from './components/Configuration'
import Video from './components/Video';
import { AppContextType, RoomContext } from '@/context/RoomContext';
import { Button, TextInput } from 'flowbite-react';

export default function Index() {
    const { stream, setUserName, userName, setJoin } = useContext(RoomContext) as AppContextType;

    return (
        <main className="h-screen flex items-center justify-center bg-gray-50">
            {/* Navbar */}
            <div className="fixed w-full h-14 bg-blue-950 top-0"></div>
            <div className="w-[709px] bg-gray-100 rounded-lg shadow-lg p-4 space-y-4">
                {/* video */}
                <div className="relative w-full">
                    {stream && <Video stream={stream} microphone={false} />}
                    {/* configuration */}
                </div>
                <TextInput placeholder='Name' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <div className='flex justify-center items-center gap-2'>
                    <Configuration />
                    <Button color="failure" disabled={userName.length <= 0} onClick={() => setJoin((prev) => !prev)}>Join</Button>
                </div>
            </div>
        </main>
    );
};