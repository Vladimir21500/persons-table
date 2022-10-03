import { IPerson, SortType } from "../../types/person";

export const SET_PERSONS = "SET_PERSONS";
export const SORT_PERSONS = "SORT_PERSONS";
export const GET_PERSONS = "GET_PERSONS";
export const ADD_PERSON = "ADD_PERSON";
export const UPDATE_PERSON = "UPDATE_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";
export const DELETE_PERSONS = "DELETE_PERSONS";

export const getPersons = () => ({
  type: GET_PERSONS,
});

export const sortPersons = (sortType: SortType) => ({
  type: SORT_PERSONS,
  payload: sortType,
});

export const setPersons = (persons: any) => ({
  type: SET_PERSONS,
  payload: persons,
});

export const addPerson = (person: IPerson) => ({
  type: ADD_PERSON,
  payload: person,
});

export const updatePerson = (person: IPerson) => ({
  type: UPDATE_PERSON,
  payload: person,
});

export const deletePerson = (id: string) => ({
  type: DELETE_PERSON,
  payload: id,
});
