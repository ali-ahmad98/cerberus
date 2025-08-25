import React, { useEffect, useState } from "react";
import teamBgStrip from "../../Assets/img/ncaaf-team-bg-strip.png";
import { getNcaaTeamLeaderByTeamIdApi } from "../../service/NcaaService";
import { Link } from "react-router-dom";
import { getNcaaPlayerLink } from "../NCAA/HelperNcaa";
import ColorRingCustomLoader from "../../components/common/ColorRingCustomLoader";
import noUserImg from "../../Assets/noImgUser.png";

const NcaafStatsPlayers = ({ teamId, yearNo }) => {
  const [ncaaTeamLeaderList, set_ncaaTeamLeaderList] = useState({});
  const [loader, setAllLoader] = useState(false);

  useEffect(() => {
    async function getNcaaTeamLeaderByTeamId() {
      setAllLoader(true);

      getNcaaTeamLeaderByTeamIdApi(teamId || "1145", yearNo).then(function (result) {
        const response = result.data;
        set_ncaaTeamLeaderList(response.response_data);
        setAllLoader(false);
      });
    }
    getNcaaTeamLeaderByTeamId();
  }, [teamId, yearNo]);

  return (
    <>
      <div className=" pt-5">
        <div className="text-center">
          <h3 className="font-28 fw-semibold mt-sm-4 text-white mb-0">Team Leaders</h3>
        </div>
        <div className="d-flex align-items-center justify-content-lg-center position-relative team_leaders_overflow">
          <div className="position-absolute team_bg_strip d-none d-xl-block">
            <img className="w-100" src={teamBgStrip} alt="" />
          </div>
          {loader ? (
            <ColorRingCustomLoader isLoader={loader} />
          ) : ncaaTeamLeaderList && ncaaTeamLeaderList.length > 0 ? (
            ncaaTeamLeaderList.map((carditem, index) => (
              <div className="mb-0" key={index}>
                <div className="d-flex align-items-center px px-xxl-0">
                  <Link to={getNcaaPlayerLink(carditem.playerDetails)}>
                    <img
                      className="team_member_img"
                      src={
                        carditem.playerDetails.profile_img
                          ? carditem.playerDetails.profile_img
                          : noUserImg
                      }
                      alt={carditem.player_name}
                      style={{ width: "85px" }}
                    />
                  </Link>
                  <div className="custom_min_width">
                    <h6 className="font-11 text-white fw-normal mb-0">
                      {carditem.stat_category} Yards
                    </h6>
                    <h6 className="font-10 fw-light text-white mb-0">{carditem.player_name}</h6>
                    <h3 className="font-22 fw-semibold mb-0 text-white">
                      &nbsp;&nbsp; {carditem.yards} {carditem.receiving_yards}
                    </h3>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p className="font-18 fw-medium red text-start px-4 py-2" style={{ color: "red" }}>
                <br /> No leader found!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NcaafStatsPlayers;
