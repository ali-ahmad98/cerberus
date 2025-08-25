import webApi from "../WebApi/WebApi";

export const getTeamListSearchApi = async (searchData) => {
    return await webApi.get('getTeamListSearch?search=' + searchData);
} 

export const getPlayerListSearchApi = async (searchData) => {
    return await webApi.get('getPlayerListSearch?search=' + searchData);
} 

export const getArticleListSearchApi = async (searchData) => {
    return await webApi.get('getArticleListSearch?search=' + searchData);
} 

export const getNewsListSearchApi = async (searchData) => {
    return await webApi.get('getNewsListSearch?search=' + searchData);
} 