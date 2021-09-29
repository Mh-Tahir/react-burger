const URL = "https://norma.nomoreparties.space/api/ingredients";
const ORDER_URL = "https://norma.nomoreparties.space/api/orders";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_ELEMENT = "SET_ELEMENT";
export const SET_ORDER_NUMBER = "SET_ORDER_NUMBER";
export const ADD_ELEMENT = "ADD_ELEMENT";
export const DELETE_ELEMENT = "DELETE_ELEMENT";
export const DELETE_ORDER = "DELETE_ORDER";
export const MOVE_ELEMENT = "MOVE_ELEMENT";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const getData = () => (dispatch) => {
  fetch(URL)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(new Error("Ошибка"));
    })
    .then((res) =>
      dispatch({
        type: SET_INGREDIENTS,
        ingredients: res.data,
      })
    )
    .catch((e) => console.log(e.message));
};

export const getOrderData = (data, token) => (dispatch) => {
  fetch(ORDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": token },
    body: JSON.stringify({
      ingredients: data.map((e) => e._id),
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(new Error("Ошибка"));
    })
    .then((res) =>
      dispatch({
        type: SET_ORDER_NUMBER,
        number: res.order.number,
      })
    )
    .catch((e) => console.log(e.message));
};
