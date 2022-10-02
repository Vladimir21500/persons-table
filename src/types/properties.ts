import { IPersonSession } from "./person";

export interface IItem {
  id: string;
  name: string;
  age: number;
  about: string;
  mapPersonsForStorage: () => IPersonSession[];
}
