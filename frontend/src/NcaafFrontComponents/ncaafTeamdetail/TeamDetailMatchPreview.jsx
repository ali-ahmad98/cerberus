import Offencetabs from "./Offencetabs";
import HighlightsWeekCard from "../../components/common/HighlightsWeekCard";
import ArticlesCard from "../../components/Aritcles/ArticlesCard";
import TopHeadings from "../../components/landingPage/TopHeadings";
import HeadlineNewsCard from "../../components/landingPage/HeadlineNewsCard";
import artificalblue from "../../Assets/artificalblue.png";
import arrow from "../../Assets/Arow.svg";

const TeamDetailMatchPreview = () => {
  return (
    <>
      <div className="row py-md-5 justify-content-between justify-content-xl-center mt-xl-4">
        <div className="col-xxl-auto order-2 col-xl-5 pe-sm-5 pe-xl-3 pe-xxl-0 col-sm-6 col-12 order-sm-2 order-xxl-1 mw-xxl-20">
          <Offencetabs />
        </div>

        <div className="col-xxl-7 order-1 col-12 order-sm-1 order-xxl-2 my-4 my-lg-5 mt-xxl-0 pt-lg-2">
          <div className="ps-xl-5">
            <div className="ms-xxl-5 ps-xl-5 row justify-content-center team-detail-highlight">
              <div className="col-sm-6 col-lg-7 col-xl-8 ps-xxl-4">
                <HighlightsWeekCard />
              </div>
              <div className="col-sm-6 col-lg-4 team-detail-article py-lg-0 py-sm-5 pt-4 pb-2">
                <ArticlesCard imagePath={artificalblue} />
              </div>
            </div>
            <a className="text-decoration-none" href="">
              <h6 className="font-web font-20 text-blue fw-medium text-end mt-4 mt-lg-5 mt-xxl-3 pt-sm-1 text-uppercase text-hover">
                view all articles
                <img className="ms-2" src={arrow} alt="arrow" />
              </h6>
            </a>
          </div>
        </div>

        <div className="col-xxl-auto col-sm-6 order-3 col-12 order-sm-3 order-xxl-3 mt-5 mt-sm-0 mw-xxl-21    team-detail-top-headings">
          <div className="ms-xxl-4 heading_cards_custom_paadding">
            <TopHeadings headlineTitle="Top headlines" />
            <HeadlineNewsCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetailMatchPreview;
