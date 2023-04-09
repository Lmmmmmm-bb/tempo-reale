<template>
  <div
    h-full
    flex
    flex-col
    items-center
  >
    <Logo />
    <div flex>
      <ClientOnly>
        <template #fallback>
          <ButtonSecondary w-24 xl:w-36 cursor-default>
            <Loading />
          </ButtonSecondary>
        </template>
        <Audios />
      </ClientOnly>
      <ThemeToggle ml-2 />
    </div>
  </div>
</template>
