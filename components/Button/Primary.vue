<template>
  <Button
    bg="#222" text-white
    border="1 #222"
    hover="bg-white text-#222"
    active="bg-#eaeaea text-#222"
    dark="border-white text-#222 bg-white"
    dark:hover="bg-#222 text-white"
    dark:active="bg-#333 text-white"
  >
    <slot />
  </Button>
</template>
