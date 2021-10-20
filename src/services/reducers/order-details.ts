import {
  SET_ORDER_NUMBER,
  ADD_ELEMENT,
  DELETE_ELEMENT,
  DELETE_ORDER,
  MOVE_ELEMENT,
  TOrderDetailsActions,
  TIngredient,
} from "../actions";

export type TState = {
  number: string;
  elements: TIngredient[];
};

const initialState: TState = {
  number: "",
  elements: [],
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions) => {
  switch (action.type) {
    case SET_ORDER_NUMBER: {
      return {
        ...state,
        number: action.number,
      };
    }
    case ADD_ELEMENT: {
      return action.element.type === "bun"
        ? {
            ...state,
            elements: [...state.elements.filter((e) => e.type !== "bun"), { ...action.element }],
          }
        : {
            ...state,
            elements: [...state.elements, { ...action.element }],
          };
    }
    case DELETE_ELEMENT: {
      return {
        ...state,
        elements: state.elements.filter((e) => e !== state.elements.find((e) => e._id === action.id)),
      };
    }
    case DELETE_ORDER: {
      return {
        ...state,
        number: "",
        elements: [],
      };
    }
    case MOVE_ELEMENT:
      return {
        ...state,
        elements: action.cards,
      };
    default: {
      return state;
    }
  }
};
