<template>
  <div
    h-full
    flex
    flex-col
    items-center
    justify-center
  >
    <ClientOnly>
      <Join />
    </ClientOnly>
    <ThemeToggle />
  </div>
</template>
