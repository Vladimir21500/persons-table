import { put, call, takeEvery } from "redux-saga/effects";
import { asyncDeletePerson, fetchPersons, postNewPerson, putPerson } from "../../gateways/persons";
import { IPerson } from "../../types/person";
import { ADD_PERSON, DELETE_PERSON, GET_PERSONS, SET_PERSONS, UPDATE_PERSON } from "../actions/persons";

const getPersons = function* (): any {
  const response = yield call(fetchPersons);
  yield put({ type: SET_PERSONS, payload: response.data });
};

const updatePersonWorker = function* ({ payload }: any): any {
  yield call(putPerson, payload);
  yield getPersons();
};

const deletePersonWorker = function* ({ payload }: any) {
  yield call(asyncDeletePerson, payload);
  yield getPersons();
};

const addPersonWorker = function* ({ payload }: any) {
  yield call(postNewPerson, payload);
  yield getPersons();
};

export default [
  takeEvery(GET_PERSONS, getPersons),
  takeEvery(UPDATE_PERSON, updatePersonWorker),
  takeEvery(DELETE_PERSON, deletePersonWorker),
  takeEvery(ADD_PERSON, addPersonWorker),
];
