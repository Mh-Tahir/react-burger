import { authReducer, TState } from "./auth";
import { SIGN_IN, SIGN_OUT } from "../actions";

const initialState: TState = {
  signIn: false,
};

describe("authReducer", () => {
  it("should handle SIGN_IN", () => {
    expect(
      authReducer(initialState, {
        type: SIGN_IN,
      })
    ).toEqual({
      signIn: true,
    });
  });

  it("should handle SIGN_OUT", () => {
    expect(
      authReducer(
        {
          signIn: true,
        },
        {
          type: SIGN_OUT,
        }
      )
    ).toEqual({
      signIn: false,
    });
  });
});
