<script setup lang="ts">
import type { AnswerMessage, CandidateMessage, OfferMessage } from '~/types/socket';

const connectionMap = ref(new Map<string, RTCPeerConnection>());
const socket = shallowRef(initSocket());
const audioWrapperRef = ref<HTMLAudioElement>();

const initConnection = async (to: string) => {
  const stream = await requestMedia();
  const peer = createPeerConnection();
  connectionMap.value.set(to, peer);
  stream.getTracks().forEach(track =>
    peer.addTrack(track, stream),
  );

  peer.addEventListener('track', (e) => {
    const audio = document.getElementById(to);
    audio?.remove();

    const _audio = document.createElement('audio');
    _audio.srcObject = e.streams[0];
    _audio.autoplay = true;
    _audio.setAttribute('id', to);
    audioWrapperRef.value?.appendChild(_audio);
  });

  peer.addEventListener('icecandidate', (e) => {
    e.candidate && socket.value.onSendCandidate(to, e.candidate);
  });

  return peer;
};

onMounted(() => {
  socket.value.socket.on(MessageTypeEnum.Leave, (id: string) => {
    const current = connectionMap.value.get(id);
    connectionMap.value.delete(id);
    current?.close();
    const audio = document.getElementById(id);
    audio?.remove();
  });

  socket.value.socket.on(MessageTypeEnum.All, (data: string[]) =>
    data.forEach(async (id) => {
      const peer = await initConnection(id);
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.value.onSendOffer(id, offer);
    }),
  );

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
    const { from, candidate } = data;
    const current = connectionMap.value.get(from);
    await current?.addIceCandidate(candidate);
  });
});
</script>

<template>
  <div ref="audioWrapperRef" />
</template>
