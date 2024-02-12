'use client';
import Index from '@/app/home/Index';
import Video from '@/app/home/components/Video';
import { AppContextType, RoomContext } from '@/context/RoomContext';
import React, { useContext, useEffect } from 'react';

type Props = {}

export default function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const { ws, me, stream, peers, join, userName, microPhoneEnabled } = useContext(RoomContext) as AppContextType;

    useEffect(() => {
        me?.on('open', () => {
            ws.emit('join-room', { roomId: id, peerId: me.id, userName: localStorage.getItem('userName') ?? userName, microPhoneEnabled })
        })
    }, [id, me, ws, microPhoneEnabled]);



    useEffect(() => {
        if (!me) return;
        if(!peers) return;
        ws.emit('toggle-microphone', { roomId: id, peerId: me.id });
    }, [id, me, ws, microPhoneEnabled])

    console.log(peers)
    return (
        <>
            {join ?
                <div className='space-y-2 p-2 relative w-[150px]'>
                    {stream ?
                        <>
                            <Video stream={stream} me={true} microphone={true} />
                            <p>{localStorage.getItem('userName') + '(me)' ?? ''}</p>
                        </>
                        : null}

                    {peers ? (
                        Object.values(peers).map((peer:any) => (
                            <>
                                <Video stream={peer.stream} key={peer.id} microphone={peer.microPhoneEnabled} />
                                <p>{peer.userName}</p>
                            </>
                        ))
                    ) : null}
                </div>
                :
                <Index />
            }
        </>
    )
}