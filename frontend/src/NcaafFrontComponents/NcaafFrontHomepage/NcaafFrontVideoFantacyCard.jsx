import { useEffect, useState } from "react";
import { getTopHeadlineArticleApi } from "../../service/homeService";
import { showDate } from "../../service/GeneralFn";
import { getArticleDetailsLink } from "../../components/Aritcles/HelperArticle";
import { Link } from "react-router-dom";

const NcaafFrontVideoFantacyCard = () => {
  const [topHeadingsList, set_topHeadingsList] = useState({});

  useEffect(() => {
    const getTopHeadlineArticle = async () => {
      getTopHeadlineArticleApi("ncaaf", 1).then(function (result) {
        const response = result.data;
        set_topHeadingsList(response.response_data);
      });
    };
    getTopHeadlineArticle();
  }, []);

  return (
    <>
      {topHeadingsList &&
        topHeadingsList.length > 0 &&
        topHeadingsList.map((element, index) => (
          <div className="pb-3 matchup-card ms-md-5" key={index}>
            <div className="video-card front-video-card d-flex flex-column flex-md-row justify-content-xxl-center justify-content-xl-start d-flex align-items-center my-lg-4">
              <Link to={getArticleDetailsLink(element)}>
                <div className="video-card-imgs position-relative">
                  <div className="video-card-img">
                    <img className="w-100" src={element.thumbnail} alt={element.title} />
                  </div>
                </div>
              </Link>
              <div className="min-w-100 px-4 py-4 ms-3 ms-xxl-4">
                <p className="font-11 font-web fw-normal mb-2">{showDate(element.created_at)}</p>
                <p className="font-20 font-web fw-normal mb-0">{element.title} </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default NcaafFrontVideoFantacyCard;
