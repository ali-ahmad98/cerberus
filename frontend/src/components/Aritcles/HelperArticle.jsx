import { articleCategoryListApi } from "../../service/articleService";

export const articleLinkList = async () => {
  var returndataList = [];
  await articleCategoryListApi().then(function (result) {
    const response = result.data;
    if (response.response_data) {
      response.response_data.map((element) => {
        var data = {
          text: element.title,
          url: element.permalink,
        };
        returndataList.push(data);
      });
    }
  });
  return returndataList;
};

export const getLinkFromTitle = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/['/]/g, "-") // apostrophes & slashes → dash
    .replace(/\s+/g, "-") // spaces → dash
    .replace(/[^a-z0-9-]/g, "") // remove other special chars
    .replace(/-+/g, "-"); // collapse multiple dashes
};

export function getArticleDetailsLink(articleRow = {}) {
  var articleLink = "#";
  if (articleRow && articleRow.permalink && articleRow.permalink != "") {
    articleLink = `/article/${articleRow.permalink}/${articleRow._id}`;
  } else {
    articleLink = `/article/${articleRow.title}/${articleRow._id}`;
  }
  return articleLink;
}
