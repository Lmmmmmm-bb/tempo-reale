<script setup lang="ts">
const emits = defineEmits<{
  (e: 'onMedia', stream: MediaStream): void;
}>();

const { $toast } = useNuxtApp();

const handleRequestMedia = async () => {
  requestMedia().then((mediaStream) => {
    emits('onMedia', mediaStream);
  }).catch(() => {
    $toast.error('Permission denied or No device found');
  });
};
</script>

<template>
  <Button
    flex
    type="success"
    @click="handleRequestMedia"
  >
    <Icon m-auto name="carbon:link" />
  </Button>
</template>
