import { SET_INGREDIENTS, SET_ELEMENT, TIngredientDetailsActions, TIngredient } from "../actions";

export type TState = {
  ingredients: TIngredient[];
  element: TIngredient;
};

const initialState: TState = {
  ingredients: [],
  element: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
};

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsActions) => {
  switch (action.type) {
    case SET_INGREDIENTS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case SET_ELEMENT: {
      return {
        ...state,
        element: action.element,
      };
    }
    default: {
      return state;
    }
  }
};
