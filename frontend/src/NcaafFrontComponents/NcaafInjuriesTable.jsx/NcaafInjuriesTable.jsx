import React, { useState, useEffect } from "react";
import reddots from "../../Assets/reddots.png";
import yellowDots from "../../Assets/yellowDots.svg";
import { getNcaafInjuriesListApi } from "../../service/thirdPartyDataService";
import { showDate } from "../../service/GeneralFn";
import noUser from "../../Assets/noImgUser.png";
import { Link } from "react-router-dom";
import ColorRingCustomLoader from "../../components/common/ColorRingCustomLoader";

const NcaafInjuriesTable = ({ teamId }) => {
  const [injuriesData, set_injuriesData] = useState({});
  const [isLoader, set_isLoader] = useState(true);

  useEffect(() => {
    async function getInjuriesList() {
      getNcaafInjuriesListApi(teamId).then(function (result) {
        const response = result.data;
        set_injuriesData(response.response_data);
        set_isLoader(false);
      });
    }
    getInjuriesList();
  }, [teamId]);

  return (
    <>
      {isLoader ? (
        <ColorRingCustomLoader isLoader={isLoader} />
      ) : (
        <>
          {injuriesData && injuriesData.length > 0 ? (
            <div className="table-responsive">
              <div className="injuryDetl">
                {injuriesData.map((obj, index) => (
                  <div className="injuryBlock" key={index}>
                    <div className="injuryUsr">
                      <img
                        src={
                          (obj.players.profile_img && obj.players.profile_img == "") ||
                          obj.players.profile_img == undefined
                            ? noUser
                            : obj.players.profile_img
                        }
                        className="injuries-img"
                        alt={obj.player_id}
                      />
                    </div>
                    <div className="injuryTxt">
                      <h6 className="font-16 fw-semibold ms-3 mb-0">
                        <Link to={`/nfl/player-profile/${obj.player_id}`}>{obj.players.name}</Link>
                        <span className="fw-normal ms-3">{obj.players.position}</span>
                      </h6>
                      <h6 className="font-16  ms-3 mb-0">
                        Status
                        <img
                          className="mx-2"
                          src={obj.report_status === "Questionable" ? yellowDots : reddots}
                          alt="dot"
                        />
                        <span className="fw-semibold">{obj.report_status}</span>
                      </h6>
                      <p>{showDate(obj.report_date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="noData">
              <p>No Data Found!</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NcaafInjuriesTable;
