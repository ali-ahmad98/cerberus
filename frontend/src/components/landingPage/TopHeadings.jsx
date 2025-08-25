import { useEffect, useState } from "react";
import { getTopHeadlineArticleApi } from "../../service/homeService";
import HeadingDotted from "../common/HeadingDotted";
import { showDate } from "../../service/GeneralFn";
import { Link } from "react-router-dom";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";

const TopHeadings = ({ page, headlineTitle }) => {
  const [topHeadingsList, set_topHeadingsList] = useState({});

  useEffect(() => {
    const getTopHeadlineArticle = async () => {
      getTopHeadlineArticleApi(page, 1).then(function (result) {
        const response = result.data;
        set_topHeadingsList(response.response_data);
      });
    };
    getTopHeadlineArticle();
  }, []);

  return (
    <>
      <div className="mb-4 pb-3 ">
        <h2 className="heading font-34 white font-web skew-heading text-uppercase">
          {headlineTitle}
        </h2>
        <HeadingDotted />
      </div>

      {topHeadingsList &&
        topHeadingsList.length > 0 &&
        topHeadingsList.map((dataRow, index) => (
          <div key={index}>
            <div className="overflow-hidden border-radius-15">
              <Link to={getArticleDetailsLink(dataRow)}>
                <img
                  className="w-100 scale-hover top-heading-img"
                  src={dataRow.thumbnail}
                  alt={dataRow.title}
                />
              </Link>
            </div>
            <div className="text-white pe-5 me-xl-3  font-web    team_detail_top_heading_content">
              <p className="font-10 pt-4">{showDate(dataRow.created_at)}</p>
              <h4 className="font-18 fw-normal pe-xl-5">{dataRow.title}</h4>
              <p className="font-11 text-light-gray fw-light py-3 mb-2">{dataRow.sub_title}</p>
              <Link
                to={"#"}
                className="text-decoration-none font-11 text-uppercase fw-semibold text-light-blue font-web"
              >
                EXPLORE MORE
              </Link>
            </div>
          </div>
        ))}
    </>
  );
};

export default TopHeadings;
