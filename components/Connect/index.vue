<script setup lang="ts">
const props = defineProps<{
  stream: MediaStream | undefined;
}>();

const emits = defineEmits<{
  (e: 'onMedia', stream: MediaStream): void;
  (e: 'onDisconnect'): void;
}>();

const { $toast } = useNuxtApp();
const [isConnected, toggleIsConnected] = useToggle();

const handleRequestMedia = () => {
  // If stream is available, disconnect.
  if (isConnected.value) {
    emits('onDisconnect');
    toggleIsConnected(false);
    return;
  }

  // If stream is already available, use it.
  if (props.stream) {
    emits('onMedia', props.stream);
    toggleIsConnected(true);
    return;
  }

  // If stream is not available, request for it.
  requestMedia().then((mediaStream) => {
    emits('onMedia', mediaStream);
    toggleIsConnected(true);
  }).catch(() => {
    $toast.error('Permission denied or No device found');
  });
};
</script>

<template>
  <Button
    flex
    :type="isConnected ? 'error' : 'success'"
    @click="handleRequestMedia"
  >
    <Icon
      m-auto
      :name="isConnected ? 'carbon:unlink' : 'carbon:link'"
    />
  </Button>
</template>
