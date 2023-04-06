<script setup lang="ts">
import { nanoid } from 'nanoid';

const id = shallowRef(nanoid());
const audioRef = ref<HTMLAudioElement>();
const peerConnection = shallowRef(initPeerConnection());

onMounted(() => {
  peerConnection.value.addEventListener('track', (e) => {
    if (audioRef.value) {
      audioRef.value.srcObject = e.streams[0];
      audioRef.value.play();
    }
  });

  peerConnection.value.addEventListener('icecandidate', (e) => {
    // eslint-disable-next-line no-console
    console.log(e.candidate);
    e.candidate && send({ id: id.value, type: 'candidate', candidate: e.candidate });
  });
});

// https://github.com/shushushv/webrtc-p2p/blob/master/client/p2p.html
const socket = useWebSocket(`wss://vcc.zeabur.app/websocket/${id.value}`, {
  onMessage: async (_, e) => {
    const data = JSON.parse(e.data);
    if (data.id === id.value) {
      return;
    }

    if (data.type === 'offer') {
      const stream = await initMediaStream();
      stream.getTracks().forEach(track => peerConnection.value.addTrack(track, stream));
      await peerConnection.value.setRemoteDescription(data.offer);
      const answer = await peerConnection.value.createAnswer();
      await peerConnection.value.setLocalDescription(answer);
      send({ id: id.value, type: 'answer', answer });
    } else if (data.type === 'answer') {
      peerConnection.value.setRemoteDescription(data.answer);
    } else if (data.type === 'candidate') {
      peerConnection.value.addIceCandidate(data.candidate);
    }
  },
});

function send(data: any) {
  socket.send(JSON.stringify(data));
}

async function handleJoin() {
  const stream = await initMediaStream();
  stream.getTracks().forEach(track =>
    peerConnection.value.addTrack(track, stream),
  );
  const offer = await peerConnection.value.createOffer();
  await peerConnection.value.setLocalDescription(offer);
  send({ id: id.value, type: 'offer', offer });
}
</script>

<template>
  <audio ref="audioRef" />
  <button @click="handleJoin">
    Start
  </button>
</template>
