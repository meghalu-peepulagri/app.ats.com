import { $fetch } from "../fetch";

export const loginAPI = async ({email,password}: {email:string,password:string}) => {
  try {
    const response = await $fetch.post("/auth/login",{email,password});
    return response.data;
  } catch (err) {
    throw err;
  }
};