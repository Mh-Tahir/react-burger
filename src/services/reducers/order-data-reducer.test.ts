import { orderDataReducer, TState } from "./order-data";
import { GET_ORDER } from "../actions";

const initialState: TState = {
  order: [],
};

describe("orderDataReducer", () => {
  it("should handle GET_ORDER", () => {
    expect(
      orderDataReducer(initialState, {
        type: GET_ORDER,
        order: {
          ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c9"],
          _id: "616ba9df7deb54001ba6183c",
          status: "done",
          number: 4736,
          name: "Бессмертный краторный бургер",
          createdAt: new Date("2021-10-17T04:43:11.404Z"),
          updatedAt: new Date("2021-10-17T04:43:11.558Z"),
          price: 2000,
          __v: 0,
        },
      })
    ).toEqual({
      order: {
        ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c9"],
        _id: "616ba9df7deb54001ba6183c",
        status: "done",
        number: 4736,
        name: "Бессмертный краторный бургер",
        createdAt: new Date("2021-10-17T04:43:11.404Z"),
        updatedAt: new Date("2021-10-17T04:43:11.558Z"),
        price: 2000,
        __v: 0,
      },
    });
  });
});
