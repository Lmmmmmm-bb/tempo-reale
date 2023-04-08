import { io } from 'socket.io-client';

export const initSocket = () => {
  const socket = io('wss://rtcc.zeabur.app');

  const onGetAll = () => {
    socket.emit(MessageTypeEnum.All);
  };

  const onSendOffer = (to: string, offer: RTCSessionDescriptionInit) => {
    socket.emit(MessageTypeEnum.Offer, { to, offer });
  };

  const onSendAnswer = (to: string, answer: RTCSessionDescriptionInit) => {
    socket.emit(MessageTypeEnum.Answer, { to, answer });
  };

  const onSendCandidate = (to: string, candidate: RTCIceCandidate) => {
    socket.emit(MessageTypeEnum.Candidate, { to, candidate });
  };

  return {
    socket,
    onGetAll,
    onSendOffer,
    onSendAnswer,
    onSendCandidate,
  };
};
