export const validateAge = (value: string) => {
  if (+value < 1) return false;
  if (+value > 100) return false;
  return true;
};
