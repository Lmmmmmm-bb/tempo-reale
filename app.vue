<template>
  <div
    h-full
    flex
    flex-col
    items-center
    justify-center
  >
    <ClientOnly>
      <Audios />
    </ClientOnly>
    <ThemeToggle />
  </div>
</template>
