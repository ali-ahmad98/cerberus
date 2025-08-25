import teamBgStrip from "../../Assets/img/ncaaf-team-bg-strip.png";
import { NcaafTeamDetailLeaderList } from "./Helper";

const NcaafTeamDetailsStatsPlayer = () => {
  return (
    <>
      <div className="pt-4 px-xl-5 px-xxl-0 mt-4 mt-lg-0">
        <div className="d-flex align-items-center justify-content-lg-center position-relative team_leaders_overflow">
          <div className="position-absolute team_bg_strip d-none d-xl-block">
            <img className="w-100" src={teamBgStrip} alt="" />
          </div>
          {NcaafTeamDetailLeaderList.map((carditem, index) => (
            <div className="mb-0" key={index}>
              <div className="d-flex align-items-center px px-xxl-0">
                <img
                  className="team_member_img"
                  src={carditem.playerImage}
                  alt="passingYardsLeaders"
                />
                <div className="custom_min_width">
                  <h6 className="font-11 text-white fw-normal mb-0">{carditem.cardtitle}</h6>
                  <h6 className="font-10 fw-light text-white mb-0">{carditem.playerName}</h6>
                  <h3 className="font-22 fw-semibold mb-0 text-white">{carditem.playerNumber}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NcaafTeamDetailsStatsPlayer;
