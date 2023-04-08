<script setup lang="ts">
const colorMode = useColorMode();

const imgSrc = computed(() => colorMode.value === 'dark' ? '/logo-dark.svg' : '/logo.svg');
</script>

<template>
  <div
    relative w-60 lg:w-64 xl:w-72
    mt-24 lg:mt-32 xl:mt-36 xl:mt-48
    mb-12 lg:mb-16
    pointer-events-none select-none
  >
    <NuxtImg w-full :width="240" :height="240" :src="imgSrc" />
    <NuxtImg z--1 w-full absolute top-0 blur-2xl scale-130 :src="imgSrc" />
  </div>
</template>
