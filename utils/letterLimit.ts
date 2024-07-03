export default function (word: string, limit: number) {
  if (word.length > limit) {
    return word.slice(0, limit) + "...";
  }

  return word;
}
