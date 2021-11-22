import { combineReducers, createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import { Context, createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";

import { IHeroState } from "src/features/heroes/heroTypes";
import { heroReducer } from "src/features/heroes/heroReducer";

export interface IApplicationState {
  heroStore: IHeroState;
}

const rootReducer = combineReducers<IApplicationState>({
  heroStore: heroReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware, logger]; // side-effect middleware

// create a makeStore function
const makeStore = (context: Context) => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<IApplicationState>>(makeStore, {
  debug: true,
});
