export const useRTC = () => {
  const peer = shallowRef<RTCPeerConnection>();
  const stream = shallowRef<MediaStream>();

  const init = async () => {
    const _peer = await initPeerConnection();
    const _stream = await initMediaStream();

    // setup audio stream
    _stream.getTracks().forEach(track =>
      _peer.addTrack(track, _stream),
    );

    peer.value = _peer;
    stream.value = _stream;
  };

  return { peer, stream, init };
};
