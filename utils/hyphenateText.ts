export default function (text: string) {
  // Convert the text to lowercase
  const lowerCaseText = text.toLowerCase();

  // Remove any non-alphanumeric characters (excluding spaces)
  const alphanumericText = lowerCaseText.replace(/[^a-z0-9\s]/g, "");

  // Replace spaces with hyphens
  const hyphenatedText = alphanumericText.replace(/\s+/g, "-");

  return hyphenatedText;
}
