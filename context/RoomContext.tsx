'use client';
import { Dispatch, createContext, useEffect, useId, useReducer, useState } from "react";
import Peer from "peerjs";
import socketIOClient from "socket.io-client";
import { useRouter } from 'next/navigation'
import { peersReducer } from "./peersReducer";
import { addPeerMicrophoneAction, addPeerNameAction, addPeerStreamAction, removePeerStreamAction } from "./peersActions";

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
    userName: string;
    setUserName: Dispatch<React.SetStateAction<string>>;
    join: boolean;
    setJoin: Dispatch<React.SetStateAction<boolean>>;
}

export const RoomContext = createContext<AppContextType | null>(null);
type Props = {
    children: React.ReactNode
}
export const RoomProvider = ({ children }: Props) => {
    let id = useId();
    const router = useRouter();
    const [me, setMe] = useState<Peer | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [microPhoneEnabled, setMicroPhoneEnabled] = useState<boolean>(false);
    const [videoEnabled, setVideoEnabled] = useState<boolean>(false);
    const [peers, dispatch] = useReducer(peersReducer, {});
    const storageUserName = localStorage.getItem('userName');
    const [userName, setUserName] = useState<string>(storageUserName ?? '');
    const [join, setJoin] = useState<boolean>(false);

    async function media() {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio:true,
                video: false
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
        participants && participants.length && participants.map((peerId) => {
            const call = stream && me?.call(peerId, stream);
            call?.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerStreamAction(peerId, userVideoStream));
            });
        });
    }

    const removePeer = ({ peerId }: { peerId: string }) => {
        dispatch(removePeerStreamAction(peerId))
    }

    useEffect(() => {
        const saveId = localStorage.getItem('userId');
        const peer = new Peer();
        id = saveId ?? id;
        peer.connect(id);
        localStorage.setItem('userId', id);
        setMe(peer);
        media();
        ws.on('room-created', enterRoom)
        ws.on('get-users', handleUserList)
        ws.on('user-disconnected', removePeer);
        ws.on('microphone-toggled', ({ peerId, microPhoneEnabled }) => {
            dispatch(addPeerMicrophoneAction(peerId, microPhoneEnabled));
            console.log(peer)
        });
    }, []);

    useEffect(() => {
        if (!stream) return;
        if (!me) return;
        ws.on('user-joined', ({ peerId, userName: name, microPhoneEnabled }: { roomId: string; peerId: string, userName: string, microPhoneEnabled: boolean }) => {
            dispatch(addPeerNameAction(peerId, name));
            dispatch(addPeerMicrophoneAction(peerId, microPhoneEnabled));
            const call = stream && me.call(peerId, stream, {
                metadata: {
                    userName,
                    microPhoneEnabled
                }
            });
            call.on("stream", (userVideoStream: MediaStream) => {
                dispatch(addPeerStreamAction(peerId, userVideoStream));
            });
        }
        );
        me.on('call', (call) => {
            const { userName, microPhoneEnabled } = call.metadata;
            dispatch(addPeerNameAction(call.peer, userName));
            dispatch(addPeerMicrophoneAction(call.peer, microPhoneEnabled));
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
                dispatch(addPeerStreamAction(call.peer, userVideoStream))
            });
        })
    }, [me, stream, userName, microPhoneEnabled])

    useEffect(() => {
        localStorage.setItem('userName', userName)
    }, [userName])

    return (
        <RoomContext.Provider value={{
            ws,
            me,
            stream,
            microPhoneEnabled,
            setMicroPhoneEnabled,
            videoEnabled,
            setVideoEnabled,
            peers,
            userName,
            setUserName,
            join,
            setJoin
        }}>
            {children}
        </RoomContext.Provider>
    );
}