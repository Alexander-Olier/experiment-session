import { ADD_PEER_NAME, ADD_PEER_STREAM, REMOVE_PEER_STREAM, STATUS_PEER_MICROPHONE } from "./peersActions";

export const initialState = {};
export interface PeerInterface {
    stream: MediaStream,
    userName: string,
    microPhoneEnabled: boolean
}
export type PeerState = Record<string, { stream?: MediaStream, userName?: string, microPhoneEnabled?: boolean }>;
type PeerAction =
    | {
        type: typeof ADD_PEER_STREAM;
        payload: { peerId: string; stream: MediaStream };
    }
    | {
        type: typeof REMOVE_PEER_STREAM;
        payload: { peerId: string };
    }
    | {
        type: typeof ADD_PEER_NAME;
        payload: { peerId: string, userName: string };
    }
    | {
        type: typeof STATUS_PEER_MICROPHONE;
        payload: { peerId: string, microPhoneEnabled: boolean };
    };
export const peersReducer = (
    state: PeerState = initialState,
    action: PeerAction
): PeerState => {
    switch (action.type) {
        case ADD_PEER_STREAM:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    stream: action.payload.stream,
                },
            };
        case ADD_PEER_NAME:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    userName: action.payload.userName,
                },
            };
        case STATUS_PEER_MICROPHONE:
            return {
                ...state,
                [action.payload.peerId]: {
                    ...state[action.payload.peerId],
                    microPhoneEnabled: action.payload.microPhoneEnabled,
                },
            };
        case REMOVE_PEER_STREAM:
            const { [action.payload.peerId]: removed, ...rest } = state;
            return { ...rest };
        default:
            return { ...state };
    }
};
