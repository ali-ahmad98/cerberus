import webApi from "../WebApi/WebApi";

export const articleCategoryListApi = async (data) => {
    return await webApi.get('categoryList');
}
export const articleListApi = async (data) => {
    return await webApi.get('articleList');
}
export const articleListByCategoryApi = async (category) => {
    return await webApi.get('articleList/' + category);
}

export const articleDetailsByLinkApi = async (permalink) => {
    return await webApi.get('articleDetails/' + permalink);
}
export const articleRelatedListApi = async (id) => {
    return await webApi.get('articleRelatedList/' + id);
}

export const articleCommentSubmitApi = async (data) => {
    return await webApi.post('articleCommentsSubmit', data);
}
export const getArticleCommentApi = async (id) => {
    return await webApi.get('getArticleComments/' + id);
}

