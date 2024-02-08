'use client';
import Video from '@/app/home/components/Video';
import { AppContextType, RoomContext } from '@/context/RoomContext';
import React, { useContext, useEffect } from 'react';

type Props = {}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const { ws, me, stream, peers } = useContext(RoomContext) as AppContextType;


    useEffect(() => {
        me?.on('open', () => {
            ws.emit('join-room', { roomId: id, peerId: me.id })
        })
    }, [id, me, ws])
    console.log(Object.values(peers))
    return (
        <div className='space-y-2 p-2 relative w-[150px]'>
            {stream && <Video stream={stream} me={true}/>}
            {peers ? (
                Object.values(peers).map((peer: any) => (
                    <Video stream={peer.stream} key={peer.id} />
                ))
            ) : (
                <p>Hi</p>
            )}
        </div>
    )
}