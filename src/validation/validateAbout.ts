export const validateAbout = (value: string) => {
  if (value.length < 2) return false;
  if (value.length > 30) return false;
  return true;
};
