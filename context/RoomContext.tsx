'use client';
import { Dispatch, createContext, useEffect, useId, useReducer, useState } from "react";
import Peer from "peerjs";
import socketIOClient from "socket.io-client";
import { useRouter } from 'next/navigation'
import { peersReducer } from "./peersReducer";
import { addPeerAction, removePeerAction } from "./peersActions";

const ENDPOINT = "http://localhost:8080";
const ws = socketIOClient(ENDPOINT);


export type AppContextType = {
    me: Peer | null;
    stream: MediaStream | null;
    microPhoneEnabled: boolean;
    videoEnabled: boolean;
    setMicroPhoneEnabled: Dispatch<React.SetStateAction<boolean>>;
    setVideoEnabled: Dispatch<React.SetStateAction<boolean>>;
    ws: any;
    peers: any
}
export const RoomContext = createContext<AppContextType | null>(null);
type Props = {
    children: React.ReactNode
}
export const RoomProvider = ({ children }: Props) => {
    const id = useId();
    const router = useRouter();
    const [me, setMe] = useState<Peer | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [microPhoneEnabled, setMicroPhoneEnabled] = useState<boolean>(true);
    const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
    const [peers, dispatch] = useReducer(peersReducer, {});


    async function media(audio: boolean, video: boolean) {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio,
                video
            }).then(stream => {
                setStream(stream);
            })
        } catch (e) {
            console.log(e);
        }
    }

    const enterRoom = ({ roomId }: { roomId: string }) => {
        router.push(`/room/${roomId}`);
    }

    const handleUserList = ({ participants }: { participants: string[] }) => {
        participants.map((peerId) => {
            const call = stream && me?.call(peerId, stream);
            call?.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        });
        console.log(participants)
    }

    const removePeer = ({ peerId }: { peerId: string }) => {
        dispatch(removePeerAction(peerId))
    }

    useEffect(() => {
        const peer = new Peer();
        peer.connect(id);
        setMe(peer);
        media(microPhoneEnabled, videoEnabled);
        ws.on('room-created', enterRoom)
        ws.on('get-users', handleUserList)
        ws.on('user-disconnected', removePeer)
    }, []);

    useEffect(() => {
        if (!stream) return;
        if (!me) return;
        ws.on('user-joined', ({ peerId }: { roomId: string; peerId: string }) => {
            const call = stream && me.call(peerId, stream);
            call.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerAction(peerId, userVideoStream));
            });
        }
        );
        me.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
                dispatch(addPeerAction(call.peer, userVideoStream))
            });
        })
    }, [me, stream])

    console.log({ stream })

    // useEffect(() => {
    //     media(microPhoneEnabled, videoEnabled);
    // }, [microPhoneEnabled, videoEnabled])

    return (
        <RoomContext.Provider value={{ ws, me, stream, microPhoneEnabled, setMicroPhoneEnabled, videoEnabled, setVideoEnabled, peers }}>
            {children}
        </RoomContext.Provider>
    );
}