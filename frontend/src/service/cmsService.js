import webApi from "../WebApi/WebApi";

export const getAboutUsData = async () => {
  return await webApi.get("cmsdetailsByUrl/about-us");
};
export const getCmsData = async (permalink) => {
  return await webApi.get("cmsdetailsByUrl" + permalink);
};
export const getFaqList = async () => {
  return await webApi.get("faqList");
};

export const getAllPodcastlist = async (viewOn, limit) => {
  return await webApi.get("podcastList?page=" + viewOn + "&limit=" + limit);
};
export const contactUsSubmit = async (data) => {
  return await webApi.post("contactUsSubmit", data);
};

export const getAllvideos = async (viewOn, limit) => {
  return await webApi.get("videoList?page=" + viewOn + "&limit=" + limit);
};

export const getAllFavourite = async () => {
  return await webApi.get("favPodcastList");
};
