'use client';
import { Dispatch, createContext, useEffect, useId, useState } from "react";
import Peer from "peerjs";

export type AppContextType = {
    me: Peer | null;
    stream: MediaStream | null;
    microPhoneEnabled: boolean;
    videoEnabled: boolean;
    setMicroPhoneEnabled: Dispatch<React.SetStateAction<boolean>>;
    setVideoEnabled: Dispatch<React.SetStateAction<boolean>>;
}
export const RoomContext = createContext<AppContextType | null>(null);
type Props = {
    children: React.ReactNode
}
export const RoomProvider = ({ children }: Props) => {
    const id = useId();
    const [me, setMe] = useState<Peer | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [microPhoneEnabled, setMicroPhoneEnabled] = useState<boolean>(true);
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true);

    async function media() {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio: microPhoneEnabled,
                video: videoEnabled
            }).then(stream => {
                setStream(stream);
            })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const peer = new Peer(id);
        setMe(peer);
    }, []);

    useEffect(() => {
        media();
    }, [microPhoneEnabled, videoEnabled])
    return (
        <RoomContext.Provider value={{ me, stream, microPhoneEnabled, setMicroPhoneEnabled, videoEnabled, setVideoEnabled }}>
            {children}
        </RoomContext.Provider>
    );
}