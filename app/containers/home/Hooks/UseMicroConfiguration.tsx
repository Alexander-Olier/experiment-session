import { useEffect, useState } from 'react'
import { checkMedia } from '../utils/check';

interface State {
  value: string;
}
export default function UseMicroConfiguration() {
  const [messageMicrophone, setMessageMicrophone] = useState<string>('');
  const [enabledMicrophone, setEnabledMicrophone] = useState<boolean>(true);
  
  useEffect(() => {
    const handleDeviceChange = async ():Promise<void> => {
      const msg: State = { value: await checkMedia('audio') };
      setMessageMicrophone(msg.value);
    };
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    handleDeviceChange();
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, []);

  return { messageMicrophone, enabledMicrophone, setEnabledMicrophone }
}