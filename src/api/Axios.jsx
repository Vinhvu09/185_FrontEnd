import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useGetAccessToken from "../hooks/useGetAccessToken";
import { store } from "../store";
import { resetState, setAuth } from "../store/Reducer/usersReducer";
export const configAxios = axios.create({
  baseURL: "http://192.168.1.36:8000/api/",
});

export const axiosPrivate = axios.create({
  baseURL: "http://127.0.0.1:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authUserLogin = async (url, data) => {
  try {
    const response = await configAxios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAxios = async (url) => {
  try {
    const response = await axiosPrivate.get(url);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postAxios = async (url, data, options) => {
  try {
    const response = await axiosPrivate.post(url, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteAxios = async (url, options) => {
  try {
    const response = await axiosPrivate.delete(url);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const patchAxios = async (url, data, options) => {
  try {
    const response = await axiosPrivate.patch(url, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateAxios = async (url, data, options) => {
  try {
    const response = await axiosPrivate.put(url, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

axiosPrivate.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.users.auth.access;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await getRefreshToken().catch((err) =>
        store.dispatch(resetState())
      );
      if (newAccessToken) {
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
    }

    return Promise.reject(error);
  }
);

export async function getRefreshToken() {
  const response = await axios.get(
    "http://127.0.0.1:4000/api/v1/auth/refresh-token"
  );
  const { token } = response;
  if (token) {
    store.dispatch(setAuth({ access: token }));
    return token;
  } else {
    store.dispatch(resetState());
  }
}
