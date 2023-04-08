<template>
  <Button
    bg-white text-black
    border="1 #eaeaea"
    hover="border-black"
    active="bg-#eaeaea"
    dark="border-#333 text-#888 bg-#222"
    dark:hover="border-white text-white"
    dark:active="bg-#333"
  >
    <slot />
  </Button>
</template>
