export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return;
  }

  const yt = usePlayer();

  if (!yt.player) {
    return;
  }

  yt.lastPlayTime = await yt.player.getCurrentTime();
  return;
});
