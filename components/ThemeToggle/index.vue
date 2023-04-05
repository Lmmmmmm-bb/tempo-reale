<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

useHead({
  meta: [
    {
      name: 'theme-color',
      content: () => isDarkMode.value ? '#222' : '#fff',
    },
  ],
});

const toggleDark = () => {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark';
};
</script>

<template>
  <button @click="toggleDark">
    <Icon :name="isDarkMode ? 'carbon:moon' : 'carbon:sun'" />
  </button>
</template>
