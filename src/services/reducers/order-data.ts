import { GET_ORDER, TGetOrderAction, TOrder } from "../actions";

export type TState = {
  order: TOrder[];
};

const initialState: TState = {
  order: [],
};

export const orderDataReducer = (state = initialState, action: TGetOrderAction) => {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        order: action.order,
      };
    }
    default: {
      return state;
    }
  }
};
