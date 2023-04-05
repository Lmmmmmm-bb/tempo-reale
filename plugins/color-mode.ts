export default defineNuxtPlugin(() => {
  const colorMode = useColorMode();

  useHead({
    meta: [
      {
        name: 'theme-color',
        content: () => colorMode.value === 'dark' ? '#222' : '#fff',
      },
    ],
  });
});
