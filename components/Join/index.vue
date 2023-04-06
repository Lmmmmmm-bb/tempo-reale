<script setup lang="ts">
import { nanoid } from 'nanoid';

import type { MessageBody } from '~/types/socket';

import { socketDomain } from './config';

const id = nanoid();
const audioRef = ref<HTMLAudioElement>();
const peerConnection = shallowRef(initPeerConnection());

// request media and add to peer connection
const initStream = async () => {
  const stream = await requestMedia();
  stream.getTracks().forEach(track =>
    peerConnection.value.addTrack(track, stream),
  );
};

const socket = useWebSocket<string>(`${socketDomain}/websocket/${id}`, {
  onMessage: async (_, e) => {
    const data: MessageBody = JSON.parse(e.data);

    // ignore self messages
    if (data.id === id) {
      return;
    }

    if (data.type === MessageTypeEnum.Offer) {
      await peerConnection.value.setRemoteDescription(data.offer);
      const answer = await peerConnection.value.createAnswer();
      await peerConnection.value.setLocalDescription(answer);
      send({ id, type: MessageTypeEnum.Answer, answer });
    } else if (data.type === MessageTypeEnum.Answer) {
      await peerConnection.value.setRemoteDescription(data.answer);
    } else if (data.type === MessageTypeEnum.Candidate) {
      await peerConnection.value.addIceCandidate(data.candidate);
    }
  },
});

function send(data: MessageBody) {
  socket.send(JSON.stringify(data));
}

async function handleStartClick() {
  const offer = await peerConnection.value.createOffer();
  await peerConnection.value.setLocalDescription(offer);
  send({ id, type: MessageTypeEnum.Offer, offer });
}

// setup peer connection listeners
onMounted(async () => {
  await initStream();
  peerConnection.value.addEventListener('track', (e) => {
    if (audioRef.value) {
      audioRef.value.srcObject = e.streams[0];
      audioRef.value.play();
    }
  });

  peerConnection.value.addEventListener('icecandidate', (e) => {
    e.candidate && send({ id, type: MessageTypeEnum.Candidate, candidate: e.candidate });
  });
});
</script>

<template>
  <audio ref="audioRef" />
  <button @click="handleStartClick">
    Start
  </button>
</template>
