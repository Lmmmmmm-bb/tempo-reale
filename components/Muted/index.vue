<script setup lang="ts">
const props = defineProps<{
  stream: MediaStream | undefined;
}>();

const { $toast } = useNuxtApp();
const [isMuted, toggleIsMuted] = useToggle(true);

const handleMuted = () => {
  const { stream } = props;
  if (stream) {
    stream.getAudioTracks().forEach(
      track => track.enabled = isMuted.value,
    );
    toggleIsMuted();
  } else {
    $toast('No Microphone Permission', {
      description: 'Please allow microphone access first.',
    });
  }
};
</script>

<template>
  <ButtonPrimary
    flex
    mx-2 w-24 xl:w-36
    @click="handleMuted"
  >
    <Icon m-auto :name="isMuted ? 'carbon:microphone' : 'carbon:microphone-off'" />
  </ButtonPrimary>
</template>
