import { useState } from "react";
import ScroreBoard from "../components/homepage/ScroreBoard";
import HeroImg from "../Assets/img/team-hero-img.png";
import NcaafTeamDetailsStatsPlayer from "../NcaafFrontComponents/ncaafTeamdetail/NcaafTeamDetailsStatsPlayer";
import TeamStatsList from "../NcaafFrontComponents/ncaafTeamdetail/TeamStatsList";
import TeamDetailMatchPreview from "../NcaafFrontComponents/ncaafTeamdetail/TeamDetailMatchPreview";
import VideosMatchPreview from "../NcaafFrontComponents/ncaafTeamdetail/VideosMatchPreview";

const NcaafTeamDetail = () => {
  const [isPlayerActive, setPlayerActive] = useState(0);

  return (
    <div className="position-relative pb-5 pb-sm-0">
      <div className="draft-page-bg d-flex flex-column   ncaaf-team-detail">
        <ScroreBoard />
        <div className="container container-standings">
          <div className="row">
            <div className="col-12 text-center mt-5">
              <img className="team-hero-img" src={HeroImg} alt="HeroImg" />
              <h2 className="fw-semibold text-white font-58 mt-4">Class of 2022</h2>
            </div>
          </div>
          <div className="pt-xl-5 mt-lg-5">
            <div className="row mt-4">
              <div className="col-12">
                <div className="col ps-md-4 z-5">
                  <button
                    className={`${
                      isPlayerActive === 0 ? "active-nav-btn-blue-scale " : "text-black bg_white"
                    } nav_tabs_btn standingsIAbtn me-2 ms-sm-2 text-uppercase mt-2`}
                    onClick={() => setPlayerActive(0)}
                  >
                    <span>OFFENSE</span>
                  </button>
                  <button
                    className={`${
                      isPlayerActive === 1 ? "active-nav-btn-blue-scale" : " text-black bg_white"
                    } nav_tabs_btn standingsIAbtn text-uppercase mt-2 ms-sm-1`}
                    onClick={() => {
                      setPlayerActive(1);
                    }}
                  >
                    <span>DEFENSE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NcaafTeamDetailsStatsPlayer />
      <TeamStatsList />
      <div className="px-sm-5 mx-4 pb-5 my-sm-5 pt-5 pt-sm-0 pt-lg-5">
        <div className="pb-xl-5">
          <TeamDetailMatchPreview />
          <VideosMatchPreview />
        </div>
      </div>
    </div>
  );
};

export default NcaafTeamDetail;
