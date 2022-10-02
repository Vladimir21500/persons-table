import { Action } from "@redux-saga/types";
import { IPerson } from "../../types/person";
import { ActionType } from "../../types/redux";
import { SET_PERSONS } from "../actions/persons";

interface IInitialState {
  persons: IPerson[];
}

const initialState: IInitialState = {
  persons: [],
};

const persons = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_PERSONS:
      return {
        ...state,
        persons: action.payload,
      };
  }
  return state;
};

export default persons;
