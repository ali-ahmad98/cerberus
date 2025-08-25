import webApi from "../WebApi/WebApi";

export const userProfile = async () => {
  return await webApi.get("userProfile");
};

export const updateUserProfile = async (data) => {
  return await webApi.post("updateUserProfile", data);
};

export const changePassword = async (data) => {
  return await webApi.post("changePassword", data);
};
