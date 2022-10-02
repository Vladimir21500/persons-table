import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import tasksSagas from "./persons";

function* rootSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([...tasksSagas]);
}

export default rootSaga;
