import { useState } from "react";
import RegularSeason from "./RegularSeason";
import FollowCfs from "../../components/landingPage/FollowLinks";
import { prodcastVideosList } from "./Helper";
import ProdcastPauseContent from "../../components/landingPage/ProdcastPauseContent";
import Prospects from "./Prospects";
import VideoImg from "../../components/homepage/VideoImg";
import VideoImg1 from "../../components/Navbar/assets/video1.png";
import VideoImg2 from "../../components/Navbar/assets/video-img-2.png";
import VideoImg3 from "../../components/Navbar/assets/video-img-3.png";
import arrow from "../../Assets/Arow.svg";
import { teamPlayerNewsArray } from "./Helper";
import TeamDetailArticle from "./TeamDetailArticle";

const VideosMatchPreview = () => {
  const [isPlay, setPlay] = useState(false);

  return (
    <div className="row mb-md-5 pb-sm-5 justify-content-between justify-content-xl-center videos-match-preview">
      <div className="col-xxl-auto col-md-6 order-2 col-xl-5 col-sm-6 col-12 order-sm-2 order-xxl-1 mw-xxl-21 pt-xxl-5 mt-xxl-5">
        <RegularSeason />
        <FollowCfs />
      </div>

      <div className="col-xxl-7 order-1 col-12 order-sm-1 order-xxl-2 mt-5 mt-xxl-0 pt-2">
        <div className="px-xxl-5 w-100 mt-5 mt-sm-0">
          <div className="px-xl-5 ms-xl-4">
            <div className="mb-4 ps-xl-5">
              <h1 className="heading white font-web skew-heading text-uppercase">Videos</h1>
              <span className="first-box d-inline-block"></span>
              <span className="second-box d-inline-block mx-2"></span>
              <span className="third-box d-inline-block"></span>
            </div>
            {prodcastVideosList.map((obj, index) => (
              <div className="d-flex flex-column pb-4" key={index}>
                <div className="d-flex justify-content-start align-items-center">
                  <div className={`position-relative w-100 ${isPlay && "bg-overlay video_img1"} `}>
                    <img className="w-100" src={obj.imgUrl1} alt="readPause-img" />
                    {isPlay ? (
                      <img
                        onClick={() => setPlay(!isPlay)}
                        className={`prodcast-pause-img ${isPlay && "on-audio-player"}`}
                        src={obj.imgUrl3}
                        alt="pausebuttonImg"
                      />
                    ) : (
                      <img
                        onClick={() => setPlay(!isPlay)}
                        className={`prodcast-pause-img ${isPlay && "on-audio-player"}`}
                        src={obj.imgUrl2}
                        alt="pausebuttonImg"
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-12 ps-xl-5 col-12 d-flex flex-column justify-content-center mt-5 mt-md-4">
                  <ProdcastPauseContent obj={obj} isPlay={isPlay} />
                </div>
              </div>
            ))}
            <div className="row mx-0 w-100 justify-content-center">
              <div className="col-lg-3 col-sm-6  my-3">
                <VideoImg VideoImg={VideoImg1} />
              </div>
              <div className="col-lg-3 col-sm-6  my-3">
                <VideoImg VideoImg={VideoImg2} />
              </div>
              <div className="col-lg-3 col-sm-6  my-3">
                <VideoImg VideoImg={VideoImg3} />
              </div>
              <div className="col-lg-3 col-sm-6  my-3">
                <VideoImg VideoImg={VideoImg1} />
              </div>
            </div>
          </div>

          <a className="text-decoration-none" href="">
            <h6 className="font-web font-20 text-blue fw-medium text-end mt-4 mt-sm-5 mt-xxl-3 pt-sm-1 text-uppercase text-hover">
              VIEW ALL VIDEOS
              <img className="ms-2" src={arrow} alt="arrow" />
            </h6>
          </a>
        </div>
      </div>

      <div className="col-xxl-auto col-sm-6 order-3 col-12 order-sm-3 order-xxl-3 mw-xxl-20 team-detail-top-headings pt-xxl-5 mt-xxl-5">
        <Prospects />
        <div className="mb-4">
          <h1 className="heading white font-web skew-heading text-uppercase font-38">
            LATEST ARTILCLES
          </h1>
          <span className="first-box d-inline-block"></span>
          <span className="second-box d-inline-block mx-2"></span>
          <span className="third-box d-inline-block"></span>
        </div>
        {teamPlayerNewsArray.map((playernews, index) => (
          <TeamDetailArticle key={index} playernews={playernews} />
        ))}
      </div>
    </div>
  );
};

export default VideosMatchPreview;
