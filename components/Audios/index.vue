<script setup lang="ts">
const audioWrapperRef = ref<HTMLAudioElement>();

const [open, toggle] = useToggle();
const { count, inc, dec } = useCounter(1);
usePeerConnection({
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
</script>

<template>
  <ButtonPrimary
    flex w-24 xl:w-36
    @click="toggle()"
  >
    <Icon m-auto :name="open ? 'carbon:microphone-off' : 'carbon:microphone'" />
  </ButtonPrimary>
  {{ count }}
  <div ref="audioWrapperRef" />
</template>
