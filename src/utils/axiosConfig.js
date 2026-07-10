import axios from "axios";

const USER_TOKEN_KEY = "token";
const SELLER_TOKEN_KEY = "seller_token";

export const setUserToken = (token) => {
  if (token) localStorage.setItem(USER_TOKEN_KEY, token);
};

export const setSellerToken = (token) => {
  if (token) localStorage.setItem(SELLER_TOKEN_KEY, token);
};

export const clearUserToken = () => localStorage.removeItem(USER_TOKEN_KEY);

export const clearSellerToken = () => localStorage.removeItem(SELLER_TOKEN_KEY);

axios.interceptors.request.use((config) => {
  config.withCredentials = true;

  const userToken = localStorage.getItem(USER_TOKEN_KEY);
  const sellerToken = localStorage.getItem(SELLER_TOKEN_KEY);

  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  if (sellerToken) {
    config.headers["Seller-Authorization"] = `Bearer ${sellerToken}`;
  }

  return config;
});

export default axios;
