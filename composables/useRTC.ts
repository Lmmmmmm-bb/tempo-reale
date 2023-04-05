export const useRTC = () => {
  const rtc = shallowRef<{
    peer: RTCPeerConnection | null;
    offer: RTCSessionDescriptionInit | null;
  }>({
    peer: null,
    offer: null,
  });
  const stream = shallowRef<MediaStream>();

  onMounted(async () => {
    const _stream = await initMediaStream();
    const _rtc = await initRTC();

    _stream.getTracks().forEach(track => _rtc.peer.addTrack(track, _stream));

    stream.value = _stream;
    rtc.value = _rtc;
  });

  return { rtc, stream };
};
