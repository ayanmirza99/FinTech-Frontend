import { retrieveData } from "./storageHelper";

export const getToken = () => {
  const token = retrieveData("token");

  return token;
};
