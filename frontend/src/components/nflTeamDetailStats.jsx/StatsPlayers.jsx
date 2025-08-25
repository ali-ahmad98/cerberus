import { useEffect, useState } from "react";
import { getNflTeamLeaderByTeamIdApi } from "../../service/thirdPartyDataService";
import noUserImg from "../../Assets/noImgUser.png";
import { Link } from "react-router-dom";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const StatsPlayers = ({ teamId, yearNo }) => {
  const [teamLeaderList, set_teamLeaderList] = useState({});
  const [isLoding, set_isLoding] = useState(true);

  useEffect(() => {
    set_isLoding(true);
    getNflTeamLeaderByTeamId();
  }, [teamId, yearNo]);

  async function getNflTeamLeaderByTeamId() {
    getNflTeamLeaderByTeamIdApi(teamId, yearNo).then(function (result) {
      const response_data = result.data.response_data;
      set_teamLeaderList({});

      var passingLeader = [];
      var rushingLeader = [];
      var receivingLeader = [];

      if (response_data.length > 0) {
        response_data.forEach((element) => {
          element.stat_category == "Passing"
            ? (passingLeader = element)
            : element.stat_category == "Rushing"
            ? (rushingLeader = element)
            : (receivingLeader = element);
        });

        if (
          Object.keys(passingLeader).length +
            Object.keys(rushingLeader).length +
            Object.keys(receivingLeader).length >
          0
        ) {
          var teamLeaderListArr = [passingLeader, rushingLeader, receivingLeader];
          set_teamLeaderList(teamLeaderListArr);
        }
      }

      set_isLoding(false);
    });
  }

  return (
    <>
      <div className="black pt-5 px-4">
        <h3 className="font-28 fw-semibold mt-sm-4 mb-4">Team Leaders</h3>
        <div className="custom-yard-leaders overflow-auto d-flex align-items-center justify-content-between">
          {isLoding ? (
            <div>
              <ColorRingCustomLoader />
            </div>
          ) : (
            <>
              {teamLeaderList && teamLeaderList.length > 0 ? (
                teamLeaderList.map((carditem, index) => (
                  <div className="passing-yards w-100 px-4 py-3" key={`teamLeader${index}`}>
                    <h6 className="font-14 fw-normal">{carditem.stat_category} Yards</h6>
                    <div className="d-flex align-items-center">
                      <Link to={`/nfl/player-profile/${carditem.playerDetails.player_id}`}>
                        <img
                          src={
                            carditem.playerDetails.profile_img
                              ? carditem.playerDetails.profile_img
                              : noUserImg
                          }
                          alt={carditem.playerDetails.name}
                          style={{ width: "60px" }}
                        />
                      </Link>

                      <div className="ms-4">
                        <h6 className="font-14 fw-light">
                          {carditem.playerDetails.name
                            ? carditem.playerDetails.name
                            : carditem.playerDetails}
                          , {carditem.playerDetails.position}
                        </h6>
                        <h3 className="font-28 fw-semibold mb-0">
                          {carditem.yards}
                          {carditem.receiving_yards}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="noData">
                  <p>No Data Found!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <br />
    </>
  );
};

export default StatsPlayers;
