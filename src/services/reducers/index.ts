import { combineReducers } from "redux";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { authReducer } from "./auth";
import { wsReducer } from "./ws";
import { orderDataReducer } from "./order-data";

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientDetailsReducer,
  order: orderDetailsReducer,
  messages: wsReducer,
  orderData: orderDataReducer,
});
