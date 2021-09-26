const REGISTER_URL = "https://norma.nomoreparties.space/api/auth/register";
const LOGIN_URL = "https://norma.nomoreparties.space/api/auth/login";
const LOGOUT_URL = "https://norma.nomoreparties.space/api/auth/logout";
const TOKEN_URL = "https://norma.nomoreparties.space/api/auth/token";
const RESET_URL = "https://norma.nomoreparties.space/api/password-reset";
const FINAL_RESET_URL = "https://norma.nomoreparties.space/api/password-reset/reset";
export const GET_USER_URL = "https://norma.nomoreparties.space/api/auth/user";

export const request = async (url, body, type) => {
  try {
    let params = {
      method: type,
      headers: { "Content-Type": "application/json" },
    };

    const accessToken = getCookie("accessToken");

    if (accessToken) {
      params.headers.authorization = accessToken;
    }

    if (body) {
      params.body = JSON.stringify(body);
    }

    const response = await fetch(`${url}`, params);
    const result = await response.json();

    if (result.success) {
      return result;
    }

    if (result.message === "jwt expired") {
      const result = await refreshToken();

      if (result.success) {
        params.headers.authorization = result.accessToken;
        const response = await fetch(`${url}`, params);
        return await response.json();
      }
      return result;
    }
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const resetPassword = async (email) => request(RESET_URL, { email }, "POST");

export const finalResetPassword = async (password, token) => request(FINAL_RESET_URL, { password, token }, "POST");

export const registerUser = async (email, name, password) => request(REGISTER_URL, { email, name, password }, "POST");

export const signIn = async (email, password) => {
  const result = await request(LOGIN_URL, { email, password }, "POST");
  if (result.success) {
    setCookie("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  return result;
};

export const signOut = async () => {
  const result = await request(LOGOUT_URL, { token: localStorage.getItem("refreshToken") }, "POST");
  if (result.success) {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return result;
};

const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken");
  if (!token) {
    return { sussess: false };
  }
  const response = await request(TOKEN_URL, { token: token }, "POST");
  const result = response.json();
  if (result.success) {
    setCookie("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  } else {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return result;
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
};
