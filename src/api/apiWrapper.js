import { constants } from "@/constants";
import { clearStorage, retrieveData } from "@/helper/storageHelper";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;

export async function apiService(endPoint, method, body = null) {
  const token = retrieveData(constants.authToken);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(`${baseUrl}/${endPoint}`, options);
  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401 && token) {
      toast.error("Session expired. Please login again.");
      clearStorage();
      window.location.reload();
    } else if (response.status === 429) {
      toast.error("Exceeded 10 requests per minute. Please try again later.");
    }
    throw new Error(responseData.message || "Something went wrong");
  }

  return responseData;
}
