export const validateName = (value: string) => {
  if (value.length < 2) return false;
  if (value.length > 10) return false;
  return true;
};
