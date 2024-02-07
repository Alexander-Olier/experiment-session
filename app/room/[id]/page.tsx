'use client';
import Video from '@/app/home/components/Video';
import { AppContextType, RoomContext } from '@/context/RoomContext';
import { PeerState } from '@/context/peersReducer';
import React, { useContext, useEffect } from 'react';

type Props = {}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const { ws, me, stream, peers } = useContext(RoomContext) as AppContextType;

    useEffect(() => {
        if (!me) return;
        ws.emit('join-room', { roomId: id, peerId: me.id })
    }, [id, me, ws])
    return (
        <div className='grid grid-cols-4 gap-4'>
            {stream && <Video stream={stream} />}
            {peers && Object.values(peers as PeerState).map((peer) => {
                <Video stream={peer.stream} />
            })}
        </div>
    )
}