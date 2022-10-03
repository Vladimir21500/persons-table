import { IPerson } from "../../types/person";
import { ActionType } from "../../types/redux";
import { SET_PERSONS, SORT_PERSONS } from "../actions/persons";

interface IInitialState {
  persons: IPerson[];
}

const initialState: IInitialState = {
  persons: [],
};

const persons = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SORT_PERSONS:
      if (action.payload === "older") {
        const sortedPersons = state.persons.slice().sort((a: IPerson, b: IPerson) => b.age - a.age);
        return {
          ...state,
          persons: sortedPersons,
        };
      }
      if (action.payload === "yanger") {
        const sortedPersons = state.persons.slice().sort((a: IPerson, b: IPerson) => a.age - b.age);
        return {
          ...state,
          persons: sortedPersons,
        };
      }
      if (action.payload === "name") {
        const sortedPersons = state.persons
          .slice()
          .sort((a: IPerson, b: IPerson) => (b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 1));
        return {
          ...state,
          persons: sortedPersons,
        };
      }
      if (action.payload === "early") {
        const sortedPersons = state.persons
          .slice()
          .sort((a: IPerson, b: IPerson) => Number(a.id) - Number(b.id));
        return {
          ...state,
          persons: sortedPersons,
        };
      }
      if (action.payload === "recent") {
        const sortedPersons = state.persons
          .slice()
          .sort((a: IPerson, b: IPerson) => Number(b.id) - Number(a.id));
        return {
          ...state,
          persons: sortedPersons,
        };
      }
      return state;
    case SET_PERSONS:
      return {
        ...state,
        persons: action.payload,
      };
  }
  return state;
};

export default persons;
