<script setup lang="ts">
const colorMode = useColorMode();

const isDarkMode = computed(() => colorMode.value === 'dark');

const toggleDark = () => {
  colorMode.preference = isDarkMode.value ? 'light' : 'dark';
};
</script>

<template>
  <Button
    flex
    type="ghost"
    aria-label="Toggle Color Mode"
    @click="toggleDark"
  >
    <Icon m-auto :name="isDarkMode ? 'carbon:moon' : 'carbon:sun'" />
  </Button>
</template>
