import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import { rootReducer } from "./reducers";

const saga = createSagaMiddleware({
  onError: (error) => {
    console.log(error);
    saga.run(rootSaga);
  },
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(saga)));

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
