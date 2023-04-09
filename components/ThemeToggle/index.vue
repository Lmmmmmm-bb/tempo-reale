<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

const toggleDark = () => {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark';
};
</script>

<template>
  <ButtonSecondary aria-label="Toggle Color Mode" @click="toggleDark">
    <Icon :name="isDarkMode ? 'carbon:moon' : 'carbon:sun'" />
  </ButtonSecondary>
</template>
