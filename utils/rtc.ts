const servers: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  // { urls: 'stun:stun.l.google.com:19305' },
  { urls: 'stun:stun.qq.com:3478' },
  { urls: 'stun:stun1.l.google.com:19302' },
  // { urls: 'stun:stun1.l.google.com:19305' },
  { urls: 'stun:stun2.l.google.com:19302' },
  // { urls: 'stun:stun2.l.google.com:19305' },
  // { urls: 'stun:stun3.l.google.com:19302' },
  // { urls: 'stun:stun3.l.google.com:19305' },
  // { urls: 'stun:stun4.l.google.com:19302' },
  // { urls: 'stun:stun4.l.google.com:19305' },
  {
    urls: 'turn:42.193.142.129:3478',
    username: 'lmmmmmm',
    credential: 'llj0416',
  },
];

export const createPeerConnection = () => {
  const peer = new RTCPeerConnection({
    iceServers: servers,
  });

  return peer;
};
