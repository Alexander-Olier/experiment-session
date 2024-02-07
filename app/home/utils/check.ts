export const checkMedia = async (str: 'audio' | 'video'): Promise<string> => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ [str]: true });
        stream.getTracks().forEach((track) => track.stop());
        return 'exist';
    } catch (e) {
        return 'not_exist';
    }
}