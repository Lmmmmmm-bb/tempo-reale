<template>
  <Button
    bg-white text-black
    border="1 #eaeaea"
    hover="border-black"
    active="bg-#eaeaea border-black"
    dark="border-#333 text-#888 bg-#222"
    dark:hover="border-white text-white"
    dark:active="bg-#333 border-white text-white"
  >
    <slot />
  </Button>
</template>
