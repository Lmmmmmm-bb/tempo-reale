<script setup lang="ts">
const handleRefresh = () => {
  location.reload();
};
</script>

<template>
  <div flex justify-center flex-col items-center>
    <Logo />
    <p text="#222 16px" dark:text-white>
      Ops, something went wrong
    </p>
    <Button mt-6 @click="handleRefresh">
      Refresh
    </Button>
  </div>
</template>
