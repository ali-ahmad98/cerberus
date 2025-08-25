import webApi from "../WebApi/WebApi";

export const getAllNewslist = async (searchNews, onSuccess, onFailure) => {
  try {
    const res = await webApi.get(`listOfNews?search=${searchNews}`);
    if (res.status === 200) {
      const r = res.data;
      let news_list = [];

      r.response_data.map((r, i) => {
        news_list.push({
          id: i + 1,
          article_headline1: r?.article_headline,
          article_date1: r?.article_date,
          article_author1: r?.article_author,
          article_excerpt1: r?.article_excerpt,
          article_link1: r?.article_link,
          player_imgs: r?.player_imgs,
          team_imgs: r?.team_imgs,
        });
      });
      return onSuccess(news_list);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};
