import { useEffect, useState } from 'react'
import { checkMedia } from '../utils/check';

interface State {
  value: string;
}
export default function UseCameraConfiguration() {
  const [messageCamera, setMessageCamera] = useState<string>('');
  const [enabledCamera, setEnabledCamera] = useState<boolean>(true);
  
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

  return { messageCamera, enabledCamera, setEnabledCamera }
}