import { IPersonSession } from "./types/person";

export const getPersonsFromSessionStorage = () => JSON.parse(String(sessionStorage.getItem("personsItems")));

export const setPersonsToSessionStorage = (persons: IPersonSession[]) => {
  sessionStorage.setItem("personsItems", JSON.stringify(persons));
};

export const getPersonFromSessionStorage = (id: string) =>
  getPersonsFromSessionStorage()?.filter((person: IPersonSession) => person.id === id)[0];

export const addItemToSessionStorage = (item: IPersonSession) => {
  const persons = getPersonsFromSessionStorage();
  persons.push(item);
  sessionStorage.setItem("personsItems", JSON.stringify(persons));
};

export const setItemByIdToSessionStorage = (id: string, item: IPersonSession) => {
  const persons = getPersonsFromSessionStorage();
  const newPersons = persons.map((person: IPersonSession) => {
    if (person.id === id) {
      return item;
    }
    return person;
  });
  sessionStorage.setItem("personsItems", JSON.stringify(newPersons));
};
