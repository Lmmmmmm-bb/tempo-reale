<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'solid' | 'ghost' | 'borderless' | 'success' | 'error';
}>(), {
  type: 'solid',
});
</script>

<template>
  <button
    h-8 px-3
    transition-colors duration-300
    border-rounded-5px
    active:select-none
    :class="{
      'btn-solid': props.type === 'solid',
      'btn-ghost': props.type === 'ghost',
      'btn-borderless': props.type === 'borderless',
      'btn-success': props.type === 'success',
      'btn-error': props.type === 'error',
    }"
  >
    <slot />
  </button>
</template>
