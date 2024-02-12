import React, { useContext } from 'react'
import UseMicroConfiguration from '../Hooks/UseMicroConfiguration'
import UseCameraConfiguration from '../Hooks/UseCameraConfiguration';
import { AppContextType, RoomContext } from '@/context/RoomContext';


export default function Configuration() {
    const { videoEnabled, setVideoEnabled, microPhoneEnabled, setMicroPhoneEnabled } = useContext(RoomContext) as AppContextType;
    const { messageMicrophone } = UseMicroConfiguration();
    const { messageCamera } = UseCameraConfiguration();
    return (
        <>
            <div className='relative'>
                {/* Tooltip warning */}
                {messageMicrophone == 'not_exist' && <div className='absolute z-10 rounded-full bg-yellow-600 p-1 right-0 -top-2'>
                    <svg width="15" height="14" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5239 10C18.5239 12.1217 17.6811 14.1566 16.1808 15.6569C14.6805 17.1571 12.6457 18 10.5239 18C8.40219 18 6.36736 17.1571 4.86707 15.6569C3.36678 14.1566 2.52393 12.1217 2.52393 10C2.52393 7.87827 3.36678 5.84344 4.86707 4.34315C6.36736 2.84285 8.40219 2 10.5239 2C12.6457 2 14.6805 2.84285 16.1808 4.34315C17.6811 5.84344 18.5239 7.87827 18.5239 10ZM11.5239 6C11.5239 6.26522 11.4186 6.51957 11.231 6.70711C11.0435 6.89464 10.7891 7 10.5239 7C10.2587 7 10.0044 6.89464 9.81682 6.70711C9.62928 6.51957 9.52393 6.26522 9.52393 6C9.52393 5.73478 9.62928 5.48043 9.81682 5.29289C10.0044 5.10536 10.2587 5 10.5239 5C10.7891 5 11.0435 5.10536 11.231 5.29289C11.4186 5.48043 11.5239 5.73478 11.5239 6ZM9.52393 9C9.25871 9 9.00436 9.10536 8.81682 9.29289C8.62928 9.48043 8.52393 9.73478 8.52393 10C8.52393 10.2652 8.62928 10.5196 8.81682 10.7071C9.00436 10.8946 9.25871 11 9.52393 11V14C9.52393 14.2652 9.62928 14.5196 9.81682 14.7071C10.0044 14.8946 10.2587 15 10.5239 15H11.5239C11.7891 15 12.0435 14.8946 12.231 14.7071C12.4186 14.5196 12.5239 14.2652 12.5239 14C12.5239 13.7348 12.4186 13.4804 12.231 13.2929C12.0435 13.1054 11.7891 13 11.5239 13V10C11.5239 9.73478 11.4186 9.48043 11.231 9.29289C11.0435 9.10536 10.7891 9 10.5239 9H9.52393Z" fill="#2b2b2b" />
                    </svg>
                </div>}
                <button className="relative w-[60px] h-[60px] bg-slate-300 shadow-sm rounded-full flex justify-center items-center" disabled={messageMicrophone == 'not_exist'} onClick={() => setMicroPhoneEnabled((prev) => !prev)} >
                    {/* line close and open microphone */}
                    {!microPhoneEnabled &&
                        <div className='absolute w-1 h-5/6 bg-red-600 -rotate-45'></div>
                    }
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.169 17.4952C13.9191 18.2453 14.9365 18.6667 15.9974 18.6667C17.0583 18.6667 18.0757 18.2453 18.8258 17.4952C19.576 16.745 19.9974 15.7276 19.9974 14.6667V6.66675C19.9974 5.60588 19.576 4.58847 18.8258 3.83832C18.0757 3.08818 17.0583 2.66675 15.9974 2.66675C14.9365 2.66675 13.9191 3.08818 13.169 3.83832C12.4188 4.58847 11.9974 5.60588 11.9974 6.66675V14.6667C11.9974 15.7276 12.4188 16.745 13.169 17.4952Z" fill="#344054" />
                        <path d="M25.3307 14.6667C25.3307 17.1421 24.3474 19.5161 22.5971 21.2664C20.8467 23.0167 18.4727 24.0001 15.9974 24.0001M15.9974 24.0001C13.522 24.0001 11.1481 23.0167 9.39773 21.2664C7.64739 19.5161 6.66406 17.1421 6.66406 14.6667M15.9974 24.0001V29.3334M15.9974 29.3334H10.6641M15.9974 29.3334H21.3307M15.9974 18.6667C14.9365 18.6667 13.9191 18.2453 13.169 17.4952C12.4188 16.745 11.9974 15.7276 11.9974 14.6667V6.66675C11.9974 5.60588 12.4188 4.58847 13.169 3.83832C13.9191 3.08818 14.9365 2.66675 15.9974 2.66675C17.0583 2.66675 18.0757 3.08818 18.8258 3.83832C19.576 4.58847 19.9974 5.60588 19.9974 6.66675V14.6667C19.9974 15.7276 19.576 16.745 18.8258 17.4952C18.0757 18.2453 17.0583 18.6667 15.9974 18.6667Z" stroke="#344054" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div className='relative'>
                {/* Tooltip warning */}
                {messageCamera == 'not_exist' && <div className='absolute z-10 rounded-full bg-yellow-600 p-1 right-0 -top-2'>
                    <svg width="15" height="14" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.5239 10C18.5239 12.1217 17.6811 14.1566 16.1808 15.6569C14.6805 17.1571 12.6457 18 10.5239 18C8.40219 18 6.36736 17.1571 4.86707 15.6569C3.36678 14.1566 2.52393 12.1217 2.52393 10C2.52393 7.87827 3.36678 5.84344 4.86707 4.34315C6.36736 2.84285 8.40219 2 10.5239 2C12.6457 2 14.6805 2.84285 16.1808 4.34315C17.6811 5.84344 18.5239 7.87827 18.5239 10ZM11.5239 6C11.5239 6.26522 11.4186 6.51957 11.231 6.70711C11.0435 6.89464 10.7891 7 10.5239 7C10.2587 7 10.0044 6.89464 9.81682 6.70711C9.62928 6.51957 9.52393 6.26522 9.52393 6C9.52393 5.73478 9.62928 5.48043 9.81682 5.29289C10.0044 5.10536 10.2587 5 10.5239 5C10.7891 5 11.0435 5.10536 11.231 5.29289C11.4186 5.48043 11.5239 5.73478 11.5239 6ZM9.52393 9C9.25871 9 9.00436 9.10536 8.81682 9.29289C8.62928 9.48043 8.52393 9.73478 8.52393 10C8.52393 10.2652 8.62928 10.5196 8.81682 10.7071C9.00436 10.8946 9.25871 11 9.52393 11V14C9.52393 14.2652 9.62928 14.5196 9.81682 14.7071C10.0044 14.8946 10.2587 15 10.5239 15H11.5239C11.7891 15 12.0435 14.8946 12.231 14.7071C12.4186 14.5196 12.5239 14.2652 12.5239 14C12.5239 13.7348 12.4186 13.4804 12.231 13.2929C12.0435 13.1054 11.7891 13 11.5239 13V10C11.5239 9.73478 11.4186 9.48043 11.231 9.29289C11.0435 9.10536 10.7891 9 10.5239 9H9.52393Z" fill="#2b2b2b" />
                    </svg>
                </div>}
                <button className="relative w-[60px] h-[60px] bg-slate-300 shadow-sm rounded-full flex justify-center items-center" disabled={messageCamera == 'not_exist'} onClick={() => setVideoEnabled((prev) => !prev)} >
                    {/* line close and open microphone */}
                    {!videoEnabled && <div className='absolute w-1 h-5/6 bg-red-600 -rotate-45'></div>}
                    <button className="w-[60px] h-[60px] bg-slate-300 shadow-sm rounded-full flex justify-center items-center">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.9584 12.7113L23.9587 12.7111L27.1584 11.1113C27.1737 11.1037 27.1906 11.1001 27.2076 11.1009C27.2246 11.1016 27.2412 11.1067 27.2557 11.1157C27.2702 11.1246 27.2822 11.1372 27.2905 11.152C27.2988 11.1669 27.3031 11.1837 27.3031 11.2007V20.7991C27.3031 20.8161 27.2988 20.8329 27.2905 20.8478C27.2822 20.8627 27.2702 20.8752 27.2557 20.8841C27.2412 20.8931 27.2246 20.8982 27.2076 20.8989C27.1906 20.8997 27.1737 20.8961 27.1584 20.8885L23.9587 19.2887L23.9584 19.2885C23.9418 19.2802 23.9278 19.2674 23.9181 19.2517L22.6424 20.0407L23.9181 19.2517C23.9083 19.2359 23.9031 19.2177 23.9031 19.1991V12.8007C23.9031 12.7821 23.9083 12.7639 23.9181 12.7482C23.9278 12.7324 23.9418 12.7196 23.9584 12.7113ZM4.70312 9.5999C4.70312 9.14903 4.88223 8.71663 5.20104 8.39782C5.51986 8.07901 5.95226 7.8999 6.40313 7.8999H16.0031C16.454 7.8999 16.8864 8.07901 17.2052 8.39782C17.524 8.71663 17.7031 9.14903 17.7031 9.5999V22.3999C17.7031 22.8508 17.524 23.2832 17.2052 23.602C16.8864 23.9208 16.454 24.0999 16.0031 24.0999H6.40313C5.95226 24.0999 5.51986 23.9208 5.20104 23.602C4.88223 23.2832 4.70312 22.8508 4.70312 22.3999V9.5999Z" fill="#344054" stroke="#344054" stroke-width="3" />
                        </svg>
                    </button>
                </button>
            </div>
        </>
    )
}