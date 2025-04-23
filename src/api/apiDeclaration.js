import { apiService } from "./apiWrapper";

//////////  GET  //////////
export const AUTH_ME = () => {
  return apiService("users/auth-me", "GET");
};
export const GET_USER_BAlANCE = async () => {
  return apiService(`fintech/balance`, "GET");
};
export const GET_TRANSACTIONS = async (page, pageSize) => {
  return apiService(
    `fintech/transactions?page=${page}&pageSize=${pageSize}`,
    "GET"
  );
};
export const GET_INVOICE_DATA = async (start, end) => {
  return apiService(`fintech/invoice?start=${start}&end=${end}`, "GET");
};
export const GET_USERS = async (page, pageSize) => {
  return apiService(`admin/users?page=${page}&pageSize=${pageSize}`, "GET");
};
export const GET_API_LOGS = async (page, pageSize) => {
  return apiService(`admin/logs?page=${page}&pageSize=${pageSize}`, "GET");
};
export const GET_RECENT_SIGNUPS = async () => {
  return apiService(`admin/recentSignUps`, "GET");
};
export const GET_SUBSCRIPTION_DISTRIBUTION = async () => {
  return apiService(`admin/subscription-distribution`, "GET");
};
export const GET_TRANSACTIONS_TREND = async () => {
  return apiService(`users/getTransactionTrends`, "GET");
};

///////////  POST  //////////
export const SIGN_UP = async (body) => {
  return apiService("users/register", "POST", body);
};
export const SIGN_IN = async (body) => {
  return apiService("users/login", "POST", body);
};
export const SUBSCRIBE = async (body) => {
  return apiService("users/subscription", "POST", body);
};
export const TRANSFER = async (body) => {
  return apiService(`fintech/transfer`, "POST", body);
};
export const CANCEL_SUBSCRIPTION = async (body) => {
  return apiService(`admin/subscriptions/cancel`, "POST", body);
};
