import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  TConnectionActions,
} from "./actions";
import { Dispatch } from "redux";

export const socketMiddleware = () => {
  return (store: { dispatch: Dispatch<TConnectionActions> }) => {
    let socket: any = null;

    return (next: any) => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event: WebSocketEventMap) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event: WebSocketEventMap) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event: WebSocketEventMap & { data: string }) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = (event: WebSocketEventMap) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
