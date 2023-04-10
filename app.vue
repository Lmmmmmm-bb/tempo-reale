<script setup lang="ts">
import { Toaster, toast } from 'vue-sonner';

const stream = ref<MediaStream>();
const audioWrapperRef = ref<HTMLAudioElement>();

const colorMode = useColorMode();
const [isMuted, toggleIsMuted] = useToggle(true);
const { target, targetStyle } = useLogoParallax();
const { connect } = usePeerConnection({
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
  if (!stream.value) {
    stream.value = mediaStream;
    connect();
  }
};

const handleMuted = () => {
  if (stream.value) {
    stream.value.getAudioTracks().forEach(
      track => track.enabled = isMuted.value,
    );
    toggleIsMuted();
  } else {
    toast('No Microphone Permission', {
      description: 'Please allow microphone access first.',
    });
  }
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
      <MediaRequest @on-media="handleGetStream" />
      <ButtonPrimary
        flex
        mx-2 w-24 xl:w-36
        transition-width duration-500 ease-out
        @click="handleMuted"
      >
        <Icon m-auto :name="isMuted ? 'carbon:microphone' : 'carbon:microphone-off'" />
      </ButtonPrimary>
      <ThemeToggle />
    </div>
  </div>
  <div ref="audioWrapperRef" />
  <ClientOnly>
    <Toaster
      rich-colors
      close-button
      position="bottom-right"
      :toast-options="{
        style: {
          transition: 'all 0.3s ease-out',
        },
      }"
      :theme="colorMode.preference"
    />
  </ClientOnly>
</template>
