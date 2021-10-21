import { wsReducer, TState } from "./ws";
import { WS_CONNECTION_SUCCESS, WS_CONNECTION_ERROR, WS_CONNECTION_CLOSED, WS_GET_MESSAGE, TMessage } from "../actions";

const initialState: TState = {
  wsConnected: false,
  messages: [],
  error: "",
};

const message: TMessage = {
  success: true,
  orders: [
    {
      ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c9"],
      _id: "616ba9df7deb54001ba6183c",
      name: "Бессмертный краторный бургер",
      status: "done",
      number: 4736,
      createdAt: new Date("2021-10-17T04:43:11.404Z"),
      updatedAt: new Date("2021-10-17T04:43:11.558Z"),
      price: 2000,
      __v: 0,
    },
  ],
  total: 4713,
  totalToday: 36,
};

describe("wsReducer", () => {
  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      error: "",
      wsConnected: true,
      messages: [],
    });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsReducer(
        {
          error: "",
          wsConnected: true,
          messages: [],
        },
        {
          type: WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      error: "",
      wsConnected: false,
      messages: [],
    });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsReducer(initialState, {
        type: WS_CONNECTION_ERROR,
        payload: "Error",
      })
    ).toEqual({
      error: "Error",
      wsConnected: false,
      messages: [],
    });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsReducer(
        {
          error: "",
          wsConnected: true,
          messages: [],
        },
        {
          type: WS_GET_MESSAGE,
          payload: [message],
        }
      )
    ).toEqual({
      error: "",
      wsConnected: true,
      messages: [[message]],
    });
  });
});
