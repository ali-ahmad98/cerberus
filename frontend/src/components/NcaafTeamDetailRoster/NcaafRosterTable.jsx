import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNcaafRosterlistById } from "./Helper";
import btnBgImg from "../../Assets/img/gray-strip-btn-bg.png";
import { getNcaaTeamDetailsApi } from "../../service/NcaaService";
import { ordinal_suffix_of } from "../../service/GeneralFn";
import { Link } from "react-router-dom";
import { getNcaaPlayerLink } from "../NCAA/HelperNcaa";
import NcaaFollowBtn from "../NCAA/NcaaFollowBtn";
import ColorRingCustomLoader from "../common/ColorRingCustomLoader";

const NcaafRosterTable = ({ teamNameId, teamList }) => {
  const navigate = useNavigate();

  const [teamDetails, set_teamDetails] = useState({});
  const [loader, setAllLoader] = useState(false);
  const [allRosterList, setAllRosterList] = useState([]);

  // Fetch roster list
  useEffect(() => {
    setAllLoader(true);
    getAllNcaafRosterlistById(teamNameId, (r) => {
      if (r) {
        setAllRosterList(r.response_data);
        setAllLoader(false);
      }
    });
  }, [teamNameId]);

  // Fetch team details
  useEffect(() => {
    getNcaaTeamDetailsApi(teamNameId).then((result) => {
      const response = result.data;
      set_teamDetails(response.response_data);
    });
  }, [teamNameId]);

  const onChangeDropdown = (e) => {
    const selectedTeam = e.target.value;
    navigate(`/ncaaf/team-details/roster?team=${selectedTeam}`);
    setAllLoader(true);

    getAllNcaafRosterlistById(selectedTeam, (r) => {
      setAllRosterList(r.response_data);
      setAllLoader(false);
    });
  };

  return (
    <div className="container mt_minus pb-md-5 mb-5">
      <div className="mb-lg-5 pb-lg-5">
        <div className="row justify-content-end pb-sm-2 pb-md-3">
          <div className="d-flex flex-column align-items-center justify-content-center pb-4 pb-sm-0">
            <div className="pt-5 custom-mb-minus">
              <img
                className="nflLogoImg"
                style={{ width: "120px" }}
                src={teamDetails.logo_standard}
                alt="ncaafLogoImg"
              />
            </div>
            <h1 className="font-42 white fw-bold text-uppercase mt-2">
              {teamDetails.team_name || "Loading..."}
            </h1>
          </div>

          <div className="col-12 text-end mb-3">
            <h3 className="font-20 white me-3 pe-xl-2 text-start text-md-end mb-0">
              <span className="fw-bold">{teamDetails.team_name || "Loading..."}</span>
            </h3>
            <div className="d-flex align-items-center justify-content-md-end pt-2 ms-md-2">
              <h2 className="font-16 white mb-0 fw-light opacity_07">
                <span className="ms-lg-4 ps-2 fw-light opacity_07">
                  {teamDetails.team_position &&
                    `${ordinal_suffix_of(teamDetails.team_position)} IN ${teamDetails.team_league}`}
                </span>
              </h2>
              <NcaaFollowBtn teamId={teamNameId} />
            </div>
          </div>

          <div className="col-12 col-lg-5 d-md-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-2 mb-3 mb-sm-2">
            <select
              className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 custom_height_60 team_select_custom_min_width"
              onChange={onChangeDropdown}
              id="teamDropdown"
              value={teamNameId}
            >
              {teamList?.map((item) => (
                <option value={item.team_id} key={item.team_id}>
                  {item.team_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loader ? (
          <ColorRingCustomLoader isLoader={loader} />
        ) : allRosterList.length > 0 ? (
          allRosterList.map((obj, index) => (
            <div key={index} className="mb-0 bg-white">
              <div
                className={`border-top-bottom-grey border-top-0 d-flex justify-content-between position-relative ${
                  index === 0 ? "py-2" : "pb-3 pt-5"
                }`}
              >
                <div
                  className={`position-absolute d-none d-xl-block ${
                    index === 0 ? "roster_gray_strip_btn_bg" : "roster_gray_strip_btn_bg_2"
                  }`}
                >
                  <img src={btnBgImg} alt="btn-img" />
                </div>
                <h3
                  className={`${
                    obj?._id?.team_position === "Offense"
                      ? "custom_margin_left_minus "
                      : "custom_margin_left_minus_2"
                  }${
                    obj?._id?.team_position === "Special Teams"
                      ? " roster_table_btn_padding"
                      : " roster_table_btn_padding_2"
                  } font-16 fw-semibold nav_tabs_stats_btn text-uppercase mb-0 transform_unset`}
                >
                  <span className="table_details_stats_heading">{obj?._id?.team_position}</span>
                </h3>
              </div>

              <div className="table-responsive mb-0 team_leaders_overflow">
                <table className="table bg-white mb-0">
                  <thead>
                    <tr>
                      <th className="ps-5 py-3 custom_min_width_300" scope="col">
                        <span className="d-inline-block ps-1 ps-lg-4 font-16 fw-semibold">
                          NAME
                        </span>
                      </th>
                      <th className="font-16 fw-semibold custom_min_width_100" scope="col">
                        POS
                      </th>
                      <th
                        className="font-16 fw-semibold custom_min_width_100 text-decoration-underline"
                        scope="col"
                      >
                        HT
                      </th>
                      <th
                        className="font-16 fw-semibold custom_min_width_100 text-decoration-underline"
                        scope="col"
                      >
                        WT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj?.doc.map((item, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-whites" : "bg-very-light-grey"}>
                        <td className="text-start font-16 fw-normal ps-4 text-nowrap">
                          <img
                            src={item?.playerDetails?.profile_img}
                            style={{ width: "50px", height: "50px" }}
                            alt={item?.player_name}
                          />
                          <span className="text-blue d-inline-block ps-5">
                            <Link to={getNcaaPlayerLink(item)}>{item?.player_name}</Link>
                          </span>
                          <span className="text-very-light-gray"> - </span>
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5 text-nowrap">
                          {item?.player_position}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5 text-nowrap">
                          {item?.player_height}
                        </td>
                        <td className="text-start font-16 fw-normal text-very-light-gray pe-5 text-nowrap">
                          {item?.player_weight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="container noData">
            <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NcaafRosterTable;
