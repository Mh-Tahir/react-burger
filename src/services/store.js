import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
