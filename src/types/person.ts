export interface IPerson {
  id?: string;
  name: string;
  age: number;
  about: string;
}

export interface IPersonSession {
  id?: string;
  name: string;
  age: number;
  about: string;
  isEditing: boolean;
}

export type SortType = "recent" | "older" | "yanger" | "name";
