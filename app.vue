<template>
  <div
    h-full
    flex
    flex-col
    items-center
  >
    <Logo />
    <ClientOnly>
      <Audios />
    </ClientOnly>
    <ThemeToggle />
  </div>
</template>
