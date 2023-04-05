<script setup lang="ts">
// https://github.com/shushushv/webrtc-p2p/blob/master/client/p2p.html
const audio = ref<HTMLAudioElement | null>(null);
const { rtc } = useRTC();

watchEffect(async () => {
  rtc.value.peer?.addEventListener('track', (e) => {
    audio.value && (audio.value.srcObject = e.streams[0]);
  });
  rtc.value.peer?.addEventListener('icecandidate', (e) => {
    if (e.candidate) {
      // TODO: send candidate to peer
    }
  });
});
</script>

<template>
  <div
    h-full
    flex
    flex-col
    items-center
    justify-center
  >
    <audio ref="audio" @loadeddata="audio?.play()" />
    <ThemeToggle />
  </div>
</template>
