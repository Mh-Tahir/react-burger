import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TConnectionActions,
  TMessage,
} from "../actions";

export type TState = {
  wsConnected: boolean;
  messages: TMessage[];
  error: string;
};

const initialState: TState = {
  wsConnected: false,
  messages: [],
  error: "",
};

export const wsReducer = (state = initialState, action: TConnectionActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: "",
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        messages: [],
        error: "",
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: "",
        messages: [action.payload],
      };
    default:
      return state;
  }
};
