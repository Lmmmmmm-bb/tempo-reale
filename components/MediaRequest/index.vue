<script setup lang="ts">
import { toast } from 'vue-sonner';

const emits = defineEmits<{
  (e: 'onMedia', stream: MediaStream): void;
}>();

const stream = shallowRef<MediaStream>();

const handleRequestMedia = async () => {
  if (stream.value) {
    return;
  }

  requestMedia().then((mediaStream) => {
    stream.value = mediaStream;
    emits('onMedia', mediaStream);
  }).catch((err) => {
    toast.error(err.message);
  });
};
</script>

<template>
  <ButtonSecondary flex @click="handleRequestMedia">
    <Icon m-auto name="carbon:link" />
  </ButtonSecondary>
</template>
