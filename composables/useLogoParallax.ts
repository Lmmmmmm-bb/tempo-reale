export const useLogoParallax = () => {
  const target = ref<HTMLDivElement>();
  const parallax = reactive(useParallax(target));

  const rotate = computed(() => ({
    x: parallax.roll * 30,
    y: parallax.tilt * 30,
  }));

  const targetStyle = computed(() => ({
    transform: `rotateX(${rotate.value.x}deg) rotateY(${rotate.value.y}deg)`,
  }));

  return {
    target,
    rotate,
    targetStyle,
  };
};
