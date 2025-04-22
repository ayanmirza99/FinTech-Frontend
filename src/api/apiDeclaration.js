import { apiService } from "./apiWrapper";

export const SIGN_UP = async (body) => {
  return apiService("users/register", "POST", body);
};
export const AUTH_ME = () => {
    return apiService("users/auth-me", "GET");
  };
export const SIGN_IN = async (body) => {
  return apiService("users/login", "POST", body);
};
export const SUBSCRIBE = async (body) => {
  return apiService("users/subscription", "POST", body);
};
