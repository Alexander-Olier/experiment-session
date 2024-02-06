import { useContext, useEffect, useState } from 'react'
import { checkMedia } from '../utils/check';
import { AppContextType, RoomContext } from '@/app/context/RoomContext';

interface State {
  value: string;
}
export default function UseCameraConfiguration() {
  const { videoEnabled, setVideoEnabled } = useContext(RoomContext) as AppContextType;
  const [messageCamera, setMessageCamera] = useState<string>('');
  
  useEffect(() => {
    const handleDeviceChange = async ():Promise<void> => {
      const msg: State = { value: await checkMedia('video') };
      setMessageCamera(msg.value);
    };
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    handleDeviceChange();
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, []);

  return { messageCamera, videoEnabled, setVideoEnabled }
}