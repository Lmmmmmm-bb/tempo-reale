<script setup lang="ts">
import { Toaster } from 'vue-sonner';

const stream = ref<MediaStream>();
const audioWrapperRef = ref<HTMLAudioElement>();

const colorMode = useColorMode();
const [isMuted, toggleIsMuted] = useToggle();
const { target, targetStyle } = useLogoParallax();
const { connect, disconnect } = usePeerConnection({
  stream,
  onTrack: (id, e) => {
    const audio = document.getElementById(id);
    audio?.remove();

    const _audio = document.createElement('audio');
    _audio.srcObject = e.streams[0];
    _audio.autoplay = true;
    _audio.setAttribute('id', id);
    audioWrapperRef.value?.appendChild(_audio);
  },
  onLeave: (id) => {
    const audio = document.getElementById(id);
    audio?.remove();
  },
});

const handleGetStream = (mediaStream: MediaStream) => {
  stream.value = mediaStream;
  connect();
};

const handleDisconnect = () => {
  disconnect();
};
</script>

<template>
  <div
    ref="target"
    h-full
    flex flex-col items-center
  >
    <div perspective-500px>
      <Logo
        transition-all duration-500 ease-out
        :style="targetStyle"
      />
    </div>
    <div flex>
      <Connect
        :stream="stream"
        @on-media="handleGetStream"
        @on-disconnect="handleDisconnect"
      />
      <Muted
        :is-muted="isMuted"
        :stream="stream"
        @on-mute="toggleIsMuted"
      />
      <ThemeToggle />
    </div>
  </div>
  <div ref="audioWrapperRef" />
  <ClientOnly>
    <Toaster
      rich-colors
      close-button
      position="bottom-right"
      :theme="colorMode.preference"
    />
  </ClientOnly>
</template>
