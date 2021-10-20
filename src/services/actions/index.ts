import { Dispatch } from "redux";

const URL = "https://norma.nomoreparties.space/api/ingredients" as const;
const ORDER_URL = "https://norma.nomoreparties.space/api/orders" as const;

export const SET_INGREDIENTS = "SET_INGREDIENTS" as const;
export const SET_ELEMENT = "SET_ELEMENT" as const;
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER" as const;
export const ADD_ELEMENT = "ADD_ELEMENT" as const;
export const DELETE_ELEMENT = "DELETE_ELEMENT" as const;
export const DELETE_ORDER = "DELETE_ORDER" as const;
export const MOVE_ELEMENT = "MOVE_ELEMENT" as const;
export const SIGN_IN = "SIGN_IN" as const;
export const SIGN_OUT = "SIGN_OUT" as const;
export const WS_CONNECTION_START = "WS_CONNECTION_START" as const;
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED" as const;
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS" as const;
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR" as const;
export const WS_GET_MESSAGE = "WS_GET_MESSAGE" as const;
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE" as const;
export const GET_ORDER = "GET_ORDER" as const;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
};

export type TMessage = {
  success: boolean;
  orders: [
    {
      ingredients: string[];
      _id: string;
      name: string;
      status: string;
      number: number;
      createdAt: Date;
      updatedAt: Date;
      price: number;
      __v: number;
    }
  ];
  total: number;
  totalToday: number;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  owner?: {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    name: string;
  };
  __v: number;
};

export type TSetIngredientsAction = {
  type: typeof SET_INGREDIENTS;
  ingredients: TIngredient[];
};

export type TSetElementAction = {
  type: typeof SET_ELEMENT;
  element: TIngredient;
};

export type TIngredientDetailsActions = TSetIngredientsAction | TSetElementAction;

export type TSetOrderNumberAction = {
  type: typeof SET_ORDER_NUMBER;
  number: string;
};

export type TAddElementAction = {
  type: typeof ADD_ELEMENT;
  element: TIngredient;
};

export type TDeleteElementAction = {
  type: typeof DELETE_ELEMENT;
  id: string;
};

export type TDeleteOrderAction = {
  type: typeof DELETE_ORDER;
};

export type TMoveElementAction = {
  type: typeof MOVE_ELEMENT;
  cards: TIngredient[];
};

export type TOrderDetailsActions =
  | TSetOrderNumberAction
  | TAddElementAction
  | TDeleteElementAction
  | TDeleteOrderAction
  | TMoveElementAction;

export type TSignInAction = {
  type: typeof SIGN_IN;
};

export type TSignOutAction = {
  type: typeof SIGN_OUT;
};

export type TAuthActions = TSignInAction | TSignOutAction;

export type TConnectionStartAction = {
  type: typeof WS_CONNECTION_START;
};
export type TConnectionSuccessAction = {
  type: typeof WS_CONNECTION_SUCCESS;
};
export type TConnectionErrorAction = {
  type: typeof WS_CONNECTION_ERROR;
  payload: WebSocketEventMap | string;
};
export type TConnectionClosedAction = {
  type: typeof WS_CONNECTION_CLOSED;
};
export type TGetMessageAction = {
  type: typeof WS_GET_MESSAGE;
  payload: TMessage[];
};
export type TSendMessageAction = {
  type: typeof WS_SEND_MESSAGE;
};

export type TConnectionActions =
  | TConnectionStartAction
  | TConnectionSuccessAction
  | TConnectionErrorAction
  | TConnectionClosedAction
  | TGetMessageAction
  | TSendMessageAction;

export type TGetOrderAction = {
  type: typeof GET_ORDER;
  order: TOrder;
};

export const getData = () => (dispatch: Dispatch<TSetIngredientsAction>) => {
  fetch(URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(new Error("Ошибка"));
    })
    .then((res) =>
      dispatch({
        type: SET_INGREDIENTS,
        ingredients: res.data,
      })
    )
    .catch((e) => console.log(e.message));
};

export const getOrderDetails =
  (data: Array<TIngredient>, token: string) => (dispatch: Dispatch<TSetOrderNumberAction>) => {
    fetch(ORDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({
        ingredients: data.map((e: TIngredient) => e._id),
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(new Error("Ошибка"));
      })
      .then((res) =>
        dispatch({
          type: SET_ORDER_NUMBER,
          number: res.order.number,
        })
      )
      .catch((e) => console.log(e.message));
  };

export const getOrderData = (id: string) => (dispatch: Dispatch<TGetOrderAction>) => {
  fetch(ORDER_URL + "/" + id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(new Error("Ошибка"));
    })
    .then((res) => {
      dispatch({
        type: GET_ORDER,
        order: res.orders[0],
      });
    })
    .catch((e) => {
      console.log(e.message);
    });
};
