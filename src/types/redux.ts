export type ActionType<T = any> = {
  type: string;
  payload?: T;
};

export type ActionPayload<T> = {
  type: string;
  payload: T;
};
