import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getNflRosterByTeamIdApi } from "../../service/thirdPartyDataService";
import noUserImg from "../../Assets/noImgUser.png";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const RosterTable = ({ teamId, yearNo }) => {
  const [nflRosterDataList, set_nflRosterDataList] = useState({});
  const [isLoader, set_isLoader] = useState(true);

  useEffect(() => {
    async function getNflRosterByTeamId() {
      getNflRosterByTeamIdApi(teamId, yearNo).then(function (result) {
        const response_data = result.data.response_data;
        set_nflRosterDataList(response_data);
        set_isLoader(false);
      });
    }
    getNflRosterByTeamId();
  }, [teamId, yearNo]);

  return (
    <>
      {isLoader ? (
        <ColorRingCustomLoader isLoader={isLoader} />
      ) : (
        <>
          {nflRosterDataList.length > 0 ? (
            nflRosterDataList.map((obj, index) => (
              <div key={index} className="table-responsive mb-0">
                <table className={`table bg-white mb-0`}>
                  <thead>
                    <tr>
                      <th className="font-26 fw-semibold ps-4">{obj.team_position}</th>
                    </tr>
                    <tr>
                      <th className="font-16 fw-medium ps-5 py-3" scope="col">
                        <p className="mb-0 ps-5 ms-5">
                          <span className="d-d-inline-block ps-2">NAME</span>
                        </p>
                      </th>
                      <th className="font-16 fw-medium" scope="col">
                        POS
                      </th>
                      <th className="font-16 fw-medium text-decoration-underline" scope="col">
                        AGE
                      </th>
                      <th className="font-16 fw-medium text-decoration-underline" scope="col">
                        HT
                      </th>
                      <th className="font-16 fw-medium text-decoration-underline" scope="col">
                        WT
                      </th>
                      <th className="font-16 fw-medium text-decoration-underline" scope="col">
                        EXP
                      </th>
                      <th className="font-16 fw-medium" scope="col">
                        COLLEGE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj.doc.map((item, index) => (
                      <tr
                        key={index}
                        className={` ${index % 2 == 0 ? " bg-whites" : " bg-very-light-grey"}`}
                      >
                        <td className="text-start font-16 fw-normal ps-4">
                          <div>
                            <p className="mb-0">
                              {/* roster-img */}
                              <img
                                src={
                                  item.playerDetails.profile_img &&
                                  item.playerDetails.profile_img != "" &&
                                  item.playerDetails.profile_img != undefined
                                    ? item.playerDetails.profile_img
                                    : noUserImg
                                }
                                alt={item.name}
                                style={{ width: "60px" }}
                              />
                              <span className="text-blue d-inline-block ps-4">
                                <Link to={`/nfl/player-profile/${item.player_id}`}>
                                  {item.playerDetails.name}
                                </Link>
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5">
                          {item.player_position}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5">
                          {item.player_age}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5">
                          {item.player_height}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5">
                          {item.player_weight}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5">
                          {item.player_exp}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5">
                          {item.player_college}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
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

export default RosterTable;
