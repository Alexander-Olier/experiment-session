import { useContext, useEffect, useState } from 'react'
import { checkMedia } from '../utils/check';
import { AppContextType, RoomContext } from '@/app/context/RoomContext';

interface State {
  value: string;
}
export default function UseMicroConfiguration() {
  const [messageMicrophone, setMessageMicrophone] = useState<string>('');

  useEffect(() => {
    const handleDeviceChange = async (): Promise<void> => {
      const msg: State = { value: await checkMedia('audio') };
      setMessageMicrophone(msg.value);
    };
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    handleDeviceChange();
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, []);

  return { messageMicrophone }
}