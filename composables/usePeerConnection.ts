import type { AnswerMessage, CandidateMessage, OfferMessage } from '~/types/socket';

interface UsePeerConnectionParams {
  onTrack: (id: string, e: RTCTrackEvent) => void;
  onLeave: (id: string) => void;
}

export const usePeerConnection = ({ onTrack, onLeave }: UsePeerConnectionParams) => {
  const connectionMap = ref(new Map<string, RTCPeerConnection>());
  const candidateMap = ref(new Map<string, RTCIceCandidateInit[]>());
  const socket = shallowRef(initSocket());

  const initConnection = async (to: string) => {
    const stream = await requestMedia();
    const peer = createPeerConnection();
    connectionMap.value.set(to, peer);
    candidateMap.value.set(to, []);
    stream.getTracks().forEach(track =>
      peer.addTrack(track, stream),
    );

    peer.addEventListener('track', (e) => {
      onTrack(to, e);
    });

    peer.addEventListener('icegatheringstatechange', (e) => {
      const { iceGatheringState } = e.target as RTCPeerConnection;
      iceGatheringState === 'complete'
        && socket.value.onSendCandidate(to, candidateMap.value.get(to) ?? []);
    });

    peer.addEventListener('icecandidate', (e) => {
      e.candidate && candidateMap.value.get(to)?.push(e.candidate);
    });

    return peer;
  };

  onMounted(() => {
    socket.value.socket.on(MessageTypeEnum.Leave, (id: string) => {
      onLeave(id);
      const current = connectionMap.value.get(id);
      current?.close();
      connectionMap.value.delete(id);
      candidateMap.value.delete(id);
    });

    socket.value.socket.on(MessageTypeEnum.All, async (data: string[]) => {
      for (const id of data) {
        const peer = await initConnection(id);
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        socket.value.onSendOffer(id, offer);
      }
    });

    socket.value.socket.on(MessageTypeEnum.Offer, async (data: OfferMessage) => {
      const { from, offer } = data;
      const current = await initConnection(from);
      await current.setRemoteDescription(offer);
      const answer = await current.createAnswer();
      await current.setLocalDescription(answer);
      socket.value.onSendAnswer(from, answer);
    });

    socket.value.socket.on(MessageTypeEnum.Answer, async (data: AnswerMessage) => {
      const { from, answer } = data;
      const current = connectionMap.value.get(from);
      await current?.setRemoteDescription(answer);
    });

    socket.value.socket.on(MessageTypeEnum.Candidate, async (data: CandidateMessage) => {
      const { from, candidates } = data;
      const current = connectionMap.value.get(from);
      for (const candidate of candidates) {
        await current?.addIceCandidate(candidate);
      }
    });
  });

  return {
    socket,
    connectionMap,
  };
};
