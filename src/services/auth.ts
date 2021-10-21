import { URL } from "../services/actions";

export const request = async (
  url: string,
  body: { email?: string; password?: string; token?: string | null; name?: string } | null,
  type: string,
  token?: string
) => {
  try {
    const requestHeaders = { "Content-Type": "application/json", Authorization: "" };
    const params =
      type === "GET"
        ? {
            method: type,
            headers: requestHeaders,
          }
        : {
            method: type,
            headers: requestHeaders,
            body: "",
          };

    const accessToken = getCookie("accessToken");

    if (accessToken) {
      params.headers.Authorization = accessToken;
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
      const result: { success: boolean; accessToken: string } = await refreshToken();

      if (result.success) {
        params.headers.Authorization = result.accessToken;
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

export const resetPassword = async (email: string) => request(`${URL}/password-reset`, { email }, "POST");

export const finalResetPassword = async (password: string, token: string) =>
  request(`${URL}/password-reset/reset`, { password, token }, "POST");

export const registerUser = async (email: string, name: string, password: string) =>
  request(`${URL}/auth/register`, { email, name, password }, "POST");

export const signIn = async (email: string, password: string) => {
  const result = await request(`${URL}/auth/login`, { email, password }, "POST");
  if (result.success) {
    setCookie("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  return result;
};

export const signOut = async () => {
  const result = await request(`${URL}/auth/logout`, { token: localStorage.getItem("refreshToken") }, "POST");
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
  const result = await request(`${URL}/auth/token`, { token: token }, "POST");
  if (result.success) {
    setCookie("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
  } else {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return result;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)") //eslint-disable-line
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, props?: any) => {
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

export const deleteCookie = (name: string) => {
  setCookie(name, "", { expires: -1 });
};
