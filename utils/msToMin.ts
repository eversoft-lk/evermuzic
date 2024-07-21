export default function (duration_ms: number) {
  const hours = Math.floor(duration_ms / 3600000);
  const minutes = Math.floor((duration_ms % 3600000) / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);

  if (hours > 0) {
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      parseInt(seconds) < 10 ? "0" : ""
    }${seconds}`;
  } else if (minutes > 0) {
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  } else {
    return `0:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  }
}
