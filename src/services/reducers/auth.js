import { SIGN_IN, SIGN_OUT } from "../actions";

const initialState = {
  signIn: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        signIn: true,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        signIn: false,
      };
    }
    default: {
      return state;
    }
  }
};
