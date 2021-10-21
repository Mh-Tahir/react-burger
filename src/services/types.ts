import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "./store";
import {
  TAuthActions,
  TConnectionActions,
  TGetOrderAction,
  TOrderDetailsActions,
  TIngredientDetailsActions,
} from "../services/actions";

type TApplicationActions =
  | TIngredientDetailsActions
  | TOrderDetailsActions
  | TGetOrderAction
  | TConnectionActions
  | TAuthActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
