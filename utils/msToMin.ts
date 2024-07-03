export default function (duration_ms: number) {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);

  return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
}
