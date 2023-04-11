<script setup lang="ts">
import { toast } from 'vue-sonner';

const emits = defineEmits<{
  (e: 'onMedia', stream: MediaStream): void;
}>();

const handleRequestMedia = async () => {
  requestMedia().then((mediaStream) => {
    emits('onMedia', mediaStream);
  }).catch(() => {
    toast.error('Permission denied or No device found');
  });
};
</script>

<template>
  <ButtonSecondary flex @click="handleRequestMedia">
    <Icon m-auto name="carbon:link" />
  </ButtonSecondary>
</template>
