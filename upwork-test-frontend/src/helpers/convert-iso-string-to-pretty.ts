export const convertIsoStringToPretty = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString();
};
