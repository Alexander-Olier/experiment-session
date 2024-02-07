import React, { useEffect } from 'react';

type Props = {
    stream: MediaStream;
}

export default function Video({ stream }: Props) {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current)
            videoRef.current.srcObject = stream;
    }, [stream])
    return (
        <video ref={videoRef} autoPlay muted />
    )
}