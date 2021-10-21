import { orderDetailsReducer, TState } from "./order-details";
import { SET_ORDER_NUMBER, ADD_ELEMENT, DELETE_ELEMENT, DELETE_ORDER, MOVE_ELEMENT, TIngredient } from "../actions";

const initialState: TState = {
  number: "",
  elements: [],
};

const elementsArr: TIngredient[] = [
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733cd",
    name: "Соус фирменный Space Sauce",
    type: "sauce",
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733ce",
    name: "Соус традиционный галактический",
    type: "sauce",
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    __v: 0,
  },
];

describe("orderDetailsReducer", () => {
  it("should handle SET_ORDER_NUMBER", () => {
    expect(
      orderDetailsReducer(
        {
          number: "",
          elements: elementsArr,
        },
        {
          type: SET_ORDER_NUMBER,
          number: "9999",
        }
      )
    ).toEqual({
      number: "9999",
      elements: elementsArr,
    });
  });

  it("should handle DELETE_ORDER", () => {
    expect(
      orderDetailsReducer(
        {
          number: "9999",
          elements: elementsArr,
        },
        {
          type: DELETE_ORDER,
        }
      )
    ).toEqual(initialState);
  });

  it("should handle ADD_ELEMENT", () => {
    expect(
      orderDetailsReducer(
        {
          number: "9999",
          elements: elementsArr,
        },
        {
          type: ADD_ELEMENT,
          element: {
            _id: "60d3b41abdacab0026a733cd",
            name: "Соус фирменный Space Sauce",
            type: "sauce",
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: "https://code.s3.yandex.net/react/code/sauce-04.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            __v: 0,
          },
        }
      )
    ).toEqual({
      number: "9999",
      elements: [
        ...elementsArr,
        {
          _id: "60d3b41abdacab0026a733cd",
          name: "Соус фирменный Space Sauce",
          type: "sauce",
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          __v: 0,
        },
      ],
    });
  });

  it("should handle MOVE_ELEMENT", () => {
    expect(
      orderDetailsReducer(
        {
          number: "9999",
          elements: elementsArr,
        },
        {
          type: MOVE_ELEMENT,
          cards: [
            {
              _id: "60d3b41abdacab0026a733c7",
              name: "Флюоресцентная булка R2-D3",
              type: "bun",
              proteins: 44,
              fat: 26,
              carbohydrates: 85,
              calories: 643,
              price: 988,
              image: "https://code.s3.yandex.net/react/code/bun-01.png",
              image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
              __v: 0,
            },

            {
              _id: "60d3b41abdacab0026a733ce",
              name: "Соус традиционный галактический",
              type: "sauce",
              proteins: 42,
              fat: 24,
              carbohydrates: 42,
              calories: 99,
              price: 15,
              image: "https://code.s3.yandex.net/react/code/sauce-03.png",
              image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
              __v: 0,
            },
            {
              _id: "60d3b41abdacab0026a733cd",
              name: "Соус фирменный Space Sauce",
              type: "sauce",
              proteins: 50,
              fat: 22,
              carbohydrates: 11,
              calories: 14,
              price: 80,
              image: "https://code.s3.yandex.net/react/code/sauce-04.png",
              image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
              image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
              __v: 0,
            },
          ],
        }
      )
    ).toEqual({
      number: "9999",
      elements: [
        {
          _id: "60d3b41abdacab0026a733c7",
          name: "Флюоресцентная булка R2-D3",
          type: "bun",
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          __v: 0,
        },
        {
          _id: "60d3b41abdacab0026a733ce",
          name: "Соус традиционный галактический",
          type: "sauce",
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: "https://code.s3.yandex.net/react/code/sauce-03.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
          __v: 0,
        },
        {
          _id: "60d3b41abdacab0026a733cd",
          name: "Соус фирменный Space Sauce",
          type: "sauce",
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          __v: 0,
        },
      ],
    });
  });

  it("should handle DELETE_ELEMENT", () => {
    expect(
      orderDetailsReducer(
        {
          number: "9999",
          elements: elementsArr,
        },
        {
          type: DELETE_ELEMENT,
          id: "60d3b41abdacab0026a733ce",
        }
      )
    ).toEqual({
      number: "9999",
      elements: [
        {
          _id: "60d3b41abdacab0026a733c7",
          name: "Флюоресцентная булка R2-D3",
          type: "bun",
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: "https://code.s3.yandex.net/react/code/bun-01.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
          __v: 0,
        },
        {
          _id: "60d3b41abdacab0026a733cd",
          name: "Соус фирменный Space Sauce",
          type: "sauce",
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          __v: 0,
        },
      ],
    });
  });
});
