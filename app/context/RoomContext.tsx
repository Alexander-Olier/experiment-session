'use client';
import { createContext, useEffect, useId, useState } from "react";
import Peer from "peerjs";
export const RoomContext = createContext<any>(null);
type Props = {
    children: React.ReactNode
}
export const RoomProvider = ({ children }: Props) => {
    const id = useId();
    const [me, setMe] = useState<Peer>();
    const [stream, setStream] = useState<MediaStream>();
    useEffect(() => {
        const peer = new Peer(id);
        setMe(peer);
        try{
            navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            }).then(stream => {
                setStream(stream);
                // peer.on("call", call => {
                //     call.answer(stream);
                //     call.on("stream", userVideoStream => {
                //         // @ts-ignore
                //         document.getElementById("user-video").srcObject = userVideoStream;
                //     })
                // })
                // peer.on("connection", connection => {
                //     connection.on("data", data => {
                //         console.log(data);
                //     })
                // })
            })
        } catch(e) {
            console.log(e);
        }
    }, [])
    return (
        <RoomContext.Provider value={{ me, stream }}>
            {children}
        </RoomContext.Provider>
    );
}