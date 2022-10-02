import { validateAbout } from "./validateAbout";
import { validateAge } from "./validateAge";
import { validateName } from "./validateName";

export const validateInput = (name: "name" | "age" | "about", value: string) => {
  if (name === "name") {
    return validateName(value);
  }
  if (name === "age") {
    return validateAge(value);
  }
  if (name === "about") {
    return validateAbout(value);
  }
  return true;
};
