export const initRTC = async () => {
  const peer = new RTCPeerConnection();
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);

  return { peer, offer };
};

export const connectRemote = async (peer: RTCPeerConnection, offer: RTCSessionDescriptionInit) => {
  await peer.setRemoteDescription(offer);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  return answer;
};
