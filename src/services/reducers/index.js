import { combineReducers } from "redux";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientDetailsReducer,
  order: orderDetailsReducer,
});
