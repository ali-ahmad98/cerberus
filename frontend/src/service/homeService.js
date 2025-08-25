import webApi from "../WebApi/WebApi";

export const homePageDataApi = async () => {
  return await webApi.get("homePageData");
};
export const homePageArticleVideosApi = async () => {
  return await webApi.get("homePageArticleVideos");
};
export const homePageNewsContentDataApi = async () => {
  return await webApi.get("homePageNewsContentData");
};

//=========== NFL NCAA Home ======//

export const getHomeBannerApi = async (category) => {
  return await webApi.get("getHomeBanner?category=" + category);
};

export const getTopHeadlineArticleApi = async (category, limit) => {
  return await webApi.get("getTopHeadlineArticle?category=" + category + "&limit=" + limit);
};

export const getTopHeadlineNewsApi = async (category, limit) => {
  return await webApi.get("getTopHeadlineNews?category=" + category + "&limit=" + limit);
};

export const getLiveScoresApi = async (page, week, weekNcaaf) => {
  return await webApi.get(`liveScores?page=${page}&week=${week}&week_ncaaf=${weekNcaaf}`);
};
