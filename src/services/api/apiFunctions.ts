import { GlobalAPI } from "./GlobalAPI";

export const fetchPhotoList = async () => {
  try {
    const res = GlobalAPI({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/photos",
    });
    return res;
  } catch (error) {
    console.log("fetchPhotoList - apiFunctions", error);
    return null;
  }
};
