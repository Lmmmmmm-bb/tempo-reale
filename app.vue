<script setup lang="ts">
const target = ref<HTMLDivElement>();
const parallax = reactive(useParallax(target));

const rotate = computed(() => ({ x: parallax.roll * 30, y: parallax.tilt * 30 }));
</script>

<template>
  <div
    ref="target"
    h-full
    flex flex-col items-center
  >
    <div perspective-500px>
      <Logo
        transition-all duration-500 ease-out
        :style="{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }"
      />
    </div>
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
