<script setup lang="ts">
const audioWrapperRef = ref<HTMLAudioElement>();

const [open, toggle] = useToggle(true);
const { count, inc, dec } = useCounter(1);
const { toggleMute } = usePeerConnection({
  onTrack: (id, e) => {
    const audio = document.getElementById(id);
    audio?.remove();

    const _audio = document.createElement('audio');
    _audio.srcObject = e.streams[0];
    _audio.autoplay = true;
    _audio.setAttribute('id', id);
    audioWrapperRef.value?.appendChild(_audio);
    inc();
  },
  onLeave: (id) => {
    const audio = document.getElementById(id);
    audio?.remove();
    dec();
  },
});

const toggleMicrophone = () => {
  toggleMute(!open.value);
  toggle();
};
</script>

<template>
  <ButtonPrimary
    flex w-24 xl:w-36
    @click="toggleMicrophone"
  >
    <Icon m-auto :name="open ? 'carbon:microphone-off' : 'carbon:microphone'" />
  </ButtonPrimary>
  {{ count }}
  <div ref="audioWrapperRef" />
</template>
