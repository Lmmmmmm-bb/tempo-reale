<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

const toggleDark = () => {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark';
};
</script>

<template>
  <button @click="toggleDark">
    <Icon :name="isDarkMode ? 'carbon:moon' : 'carbon:sun'" />
  </button>
</template>
