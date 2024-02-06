'use client'
import React, { useContext } from 'react'
import Configuration from './components/Configuration'
import { AppContextType, RoomContext } from '@/app/context/RoomContext';
import Video from './components/Video';

export default function Index() {
    const { stream } = useContext(RoomContext) as AppContextType;
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
                    </div>
                </div>
            </div>
        </main>
    );
};