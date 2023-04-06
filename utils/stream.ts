export const requestMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  return stream;
};
