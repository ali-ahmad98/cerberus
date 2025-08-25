import React, { useEffect, useState } from "react";
import topHeadingMen2 from "../../Assets/img/top-heading-men.png";
import { RightArrowIcon } from "../icons/Icons";
import { getTopHeadlineNewsApi } from "../../service/homeService";
import { showDate } from "../../service/GeneralFn";

const HeadlineNewsCard = ({ page }) => {
  const [topHeadingsNewsList, set_topHeadingsNewsList] = useState({});

  useEffect(() => {
    const getTopHeadlineNews = async () => {
      getTopHeadlineNewsApi(page, 1).then(function (result) {
        const response = result.data;
        set_topHeadingsNewsList(response.response_data);
      });
    };
    getTopHeadlineNews();
  }, []);

  return (
    <>
      {topHeadingsNewsList &&
        topHeadingsNewsList.length > 0 &&
        topHeadingsNewsList.map((dataRow, index) => (
          <div className="mt-4 position-relative card-hover headlines_card" key={index}>
            <img
              className="w-100 top-heading-img"
              src={topHeadingMen2}
              alt={dataRow.article_headline}
            />
            <div className="text-white top-heading-floating-text">
              <p className="font-12 pt-4 mb-2   font-web">{showDate(dataRow.article_date)}</p>
              <h4 className="font-14 fw-bold mw-200   font-web">{dataRow.article_headline}</h4>
              <p className="font-13 fw-normal py-2 mb-2 me-4   font-web">
                {dataRow.article_author}
              </p>
            </div>
            <div className="right-arrow-icon">
              <a href={dataRow.article_link} target="_blank">
                <RightArrowIcon />
              </a>
            </div>
          </div>
        ))}
    </>
  );
};

export default HeadlineNewsCard;
