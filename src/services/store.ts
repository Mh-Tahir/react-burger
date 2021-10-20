import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "./middleware";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()));

export const store = createStore(rootReducer, enhancer);
