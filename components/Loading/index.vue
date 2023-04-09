<template>
  <div
    relative
    p-0 m-0 w-full h-full min-h-2
    flex-inline items-center
  >
    <span
      w-full h-full
      flex justify-center items-center
      absolute top="50%" left="50%"
      bg-transparent select-none
      transform-translate="x--50% y--50%"
    >
      <i
        v-for="i in 3"
        :key="i"
        inline-block
        my-0 mx-2px w-0.25em h-0.25em
        border-rounded="50%" bg="#222"
        dark-bg-white
        animate-both animate-duration-1400 animate-iteration-infinite animate-name-loading-blink
        :class="[
          i === 2 && 'animate-delay-200',
          i === 3 && 'animate-delay-400',
        ]"
      />
    </span>
  </div>
</template>

<style>
@keyframes loading-blink {
  0% {
    opacity: 0.2;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0.2;
  }
}
</style>
