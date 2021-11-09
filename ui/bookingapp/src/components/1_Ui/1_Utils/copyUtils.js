export const copyTextToClipboard = async function (value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error(error);
  }
};
