import { AppContextType, RoomContext } from '@/context/RoomContext';
import { useRef, useEffect, useContext } from 'react';

type Props = {
    stream: MediaStream;
    me?: true;
    microphone: boolean
}

export default function Video({ stream, me, microphone }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { microPhoneEnabled, setMicroPhoneEnabled } = useContext(RoomContext) as AppContextType;

    useEffect(() => {
        if (videoRef.current)
            videoRef.current.srcObject = stream;
    }, [stream])
    return (
        <div>
            <p>
                {!microphone ?
                    'active'
                    : 'deactive'
                }
            </p>
            <video ref={videoRef} autoPlay className='w-full h-[180px]' muted={microphone} />
            {/* :
                    <div className='w-full h-[180px] bg-gray-600 flex justify-center items-center'>
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843Z" stroke="#141A22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.05025 16.0503C8.36301 14.7375 10.1435 14 12 14C13.8565 14 15.637 14.7375 16.9497 16.0503C18.2625 17.363 19 19.1435 19 21H5C5 19.1435 5.7375 17.363 7.05025 16.0503Z" stroke="#141A22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div> */}


            {
                me ?
                    <div className='w-full bg-slate-500 flex items-center p-2'>
                        <button className='p-1 shadow-lg rounded-full bg-slate-700 text-white relative flex justify-center items-center' onClick={() => setMicroPhoneEnabled((prev) => !prev)}>
                            {!microPhoneEnabled ?
                                <div className='absolute w-0.5 h-5/6 bg-red-600 -rotate-45'></div>
                                : null
                            }                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 11C19 12.8565 18.2625 14.637 16.9497 15.9497C15.637 17.2625 13.8565 18 12 18M12 18C10.1435 18 8.36301 17.2625 7.05025 15.9497C5.7375 14.637 5 12.8565 5 11M12 18V22M12 22H8M12 22H16M12 14C11.2044 14 10.4413 13.6839 9.87868 13.1213C9.31607 12.5587 9 11.7956 9 11V5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5V11C15 11.7956 14.6839 12.5587 14.1213 13.1213C13.5587 13.6839 12.7956 14 12 14Z" stroke="#141A22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                    : null

            }
        </div >
    )
}