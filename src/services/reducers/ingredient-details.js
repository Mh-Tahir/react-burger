import { SET_INGREDIENTS, SET_ELEMENT } from "../actions";

const initialState = {
  ingredients: [],
  element: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
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
