import VideoFantacyCard from "../homepage/VideoFantacyCard";
import HeadlineNewsCard from "../landingPage/HeadlineNewsCard";
import NflSideLinks from "../landingPage/NflSideLinks";
import TopHeadings from "../landingPage/TopHeadings";
import DraftTable from "./DraftTable";
import { topheadlinedata } from "../landingPage/Helper";

const DraftTableNewsAndVideoElements = () => {
  return (
    <>
      <div className="position-relative container-fluid">
        <div className="row mx-0 justify-content-center">
          <div className="col-xxl-auto col-sm-6 col-12 mw-xxl-20 order-2 order-xxl-1 pt-10-rem">
            <div className="mb-4">
              <h2 className="heading font-34 white font-web skew-heading text-uppercase pb-2 ">
                draft VIDEOS
              </h2>
              <div className="pb-5">
                <span className="first-box d-inline-block"></span>
                <span className="second-box d-inline-block mx-2"></span>
                <span className="third-box d-inline-block"></span>
              </div>
              <div className="draft-page">
                <VideoFantacyCard />
                <VideoFantacyCard />
                <VideoFantacyCard />
              </div>
            </div>
            <div className="pt-4">
              <NflSideLinks title="top headlines" linksdata={topheadlinedata} />
            </div>
          </div>
          <div className="col-xxl-7 col-12 order-1 order-xxl-2 my-5 mt-xxl-0">
            <DraftTable />
          </div>
          <div className="col-xxl-auto col-sm-6 col-12 mw-xxl-21 order-3 order-xxl-3 pt-10-rem">
            <TopHeadings headlineTitle="2020 draft content" />
            <div className="my-5">
              <HeadlineNewsCard />
            </div>
            <HeadlineNewsCard />
          </div>
        </div>
        <div className="vh-25 py-5 py-md-0"></div>
      </div>
    </>
  );
};

export default DraftTableNewsAndVideoElements;
