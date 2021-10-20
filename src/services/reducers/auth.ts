import { SIGN_IN, SIGN_OUT, TAuthActions } from "../actions";

export type TState = {
  signIn: boolean;
};

const initialState: TState = {
  signIn: false,
};

export const authReducer = (state = initialState, action: TAuthActions) => {
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
