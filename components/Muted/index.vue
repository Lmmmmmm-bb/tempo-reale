<script setup lang="ts">
const props = defineProps<{
  isMuted: boolean;
  stream: MediaStream | undefined;
}>();

const emits = defineEmits<{
  (e: 'onMute', isMuted: boolean): void;
}>();

const { $toast } = useNuxtApp();

const handleMuted = () => {
  const { stream } = props;
  if (stream) {
    stream.getAudioTracks().forEach(
      track => track.enabled = props.isMuted,
    );
    emits('onMute', !props.isMuted);
  } else {
    $toast('No Microphone Permission', {
      description: 'Please allow microphone access first.',
    });
  }
};
</script>

<template>
  <Button
    flex
    mx-2 w-24 xl:w-36
    @click="handleMuted"
  >
    <Icon m-auto :name="props.isMuted ? 'carbon:microphone' : 'carbon:microphone-off'" />
  </Button>
</template>
