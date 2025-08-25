import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../../src/components/Navbar/assets/arrowicon.png";
import News from "../common/News";
import { homePageNewsContentDataApi } from "../../service/homeService";
import HeadingDotted from "../common/HeadingDotted";

const NewsSection = () => {
  const [newsData, set_newsData] = useState({});
  useEffect(() => {
    getHomePageNewsContentData();
  }, []);

  async function getHomePageNewsContentData() {
    homePageNewsContentDataApi().then(function (result) {
      const response = result.data;
      set_newsData(response.response_data);
    });
  }

  const nflNews = newsData && newsData.length > 0 ? newsData.slice(0, 3) : {};
  const ncaafNews = newsData && newsData.length > 0 ? newsData.slice(3, 6) : {};
  return (
    <div className="newssection position-relative">
      <div className="container py-sm-5 py-4">
        <div className="row justify-content-between">
          <div className="col-xl-5">
            <div className="py-4">
              <h3 className="heading white font-web skew-heading">NFL PLAYER NEWS</h3>
              <HeadingDotted />
            </div>
            {nflNews.length > 0 &&
              nflNews.map((newsDataRow, index) => <News key={index} newsDataRow={newsDataRow} />)}

            <Link to="/news-search?searchdata=nfl">
              <p className="text-end white text-hover cursor-pointer mb-0 font-web font-semibold para">
                VIEW MORE NEWS{" "}
                <span className="ms-3">
                  <img src={ArrowIcon} alt="ArrowIcon" />
                </span>
              </p>
            </Link>
          </div>
          <div className="col-xl-2 d-flex justify-content-center my-xl-5 my-3">
            <div className="border-line d-xl-block d-none"></div>
            <div className="border-line2 d-xl-none d-block"></div>
          </div>
          <div className="col-xl-5">
            <div className="py-4">
              <h3 className="heading white font-web skew-heading text-nowrap">NCAAF PLAYER NEWS</h3>
              <HeadingDotted />
            </div>
            {ncaafNews.length > 0 &&
              ncaafNews.map((newsDataRow, index) => <News key={index} newsDataRow={newsDataRow} />)}

            <Link to="/news-search?searchdata=ncaaf">
              <p className="text-end mb-0 white text-hover cursor-pointer font-web font-semibold para">
                VIEW MORE NEWS{" "}
                <span className="ms-3">
                  <img src={ArrowIcon} alt="ArrowIcon" />
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
