import axios, { Method } from "axios";

export const GlobalAPI = async ({
  method,
  url,
}: {
  method: Method;
  url: string;
}) => {
  try { 
    const res = axios({ method: method, url: url });
    return res;
  } catch (error) {
    console.log("GlobalAPI - ", error);
  }
};
