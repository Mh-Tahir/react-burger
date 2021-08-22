import { combineReducers } from "redux";
import { ingredientDetailsReducer } from "./ingredient-details";
import { orderDetailsReducer } from "./order-details";

export const rootReducer = combineReducers({
  ingredients: ingredientDetailsReducer,
  order: orderDetailsReducer,
});
