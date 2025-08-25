import { useEffect, useState } from "react";
import ScroreBoard from "../components/homepage/ScroreBoard";
import NcaafHero from "../components/common/NcaafHero";
import NcaafInjuriesTable from "../NcaafFrontComponents/NcaafInjuriesTable.jsx/NcaafInjuriesTable";
import { useLocation, useNavigate } from "react-router-dom";
import { getNcaafTeamPosition } from "../NcaafFrontComponents/NcaafInjuriesTable.jsx/Helper";
import NcaaFollowBtn from "../components/NCAA/NcaaFollowBtn";
import {
  ncaafTeamDetailsByTeamIdApi,
  ncaafTeamListDropdownApi,
} from "../service/thirdPartyDataService";
import { Helmet } from "react-helmet";
import GlobalConfig from "../GlobalConfig";

const NcaafInjuries = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [teamId, set_teamId] = useState(queryParams.get("team"));
  const [ncaafTeamDetails, set_nccafTeamDetails] = useState({});
  const [ncaafTeamList, set_ncaafTeamList] = useState({});

  useEffect(() => {
    async function getNcaafTeamList() {
      ncaafTeamListDropdownApi().then(function (result) {
        const response = result.data;
        set_ncaafTeamList(response.response_data);
      });
    }
    getNcaafTeamList();
  }, []);

  useEffect(() => {
    getNcaafTeamDetails(teamId);
  }, [teamId]);

  useEffect(() => {
    set_teamId(queryParams.get("team"));
    if (queryParams.size == 0 && ncaafTeamList && ncaafTeamList.length > 0) {
      set_teamId(ncaafTeamList[0].team_id);
    }
  }, []);

  async function getNcaafTeamDetails(teamId) {
    ncaafTeamDetailsByTeamIdApi(teamId).then(function (result) {
      const response = result.data;
      set_nccafTeamDetails(response.response_data);
    });
  }

  const navigate = useNavigate();
  const onChageDropdown = () => {
    var team = document.getElementById("teamDropdown").value;
    navigate(`/ncaaf/team-details/injuries?team=${team}`);
    set_teamId(team);
  };

  return (
    <>
      <Helmet>
        <title>
          {" "}
          Injuries | {ncaafTeamDetails ? ncaafTeamDetails.team_name + " | " : ""}{" "}
          {GlobalConfig.SITE_NAME}{" "}
        </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="bg-black pb-5 mb-sm-5">
        <div className="ncaaf-scoreboard-page-bg d-flex flex-column ">
          <ScroreBoard />
          <div className="pt-5">
            <NcaafHero
              value="Injuries"
              logo={ncaafTeamDetails?.logo_standard}
              team={ncaafTeamDetails?.team_name}
            />
          </div>
        </div>
      </div>

      <div className="mb-5 pb-5 margin-top-negative position-relative z-1 injuries-table-middle ">
        <div className="container">
          <div className="row justify-content-end mx-0 mb-lg-5 mb-2">
            <div className=" col-12 text-end mb-lg-4 mb-2 pe-0">
              <div className="d-flex align-items-center justify-content-end">
                <h2 className="font-20 white mb-0">
                  <span className="ms-lg-4 ps-2">{getNcaafTeamPosition(ncaafTeamDetails)}</span>
                </h2>
                <NcaaFollowBtn teamId={teamId} />
              </div>
            </div>
            <div className="col-6 col-sm-5 col-md-4 col-lg-12 pe-0">
              <div className="d-flex justify-content-end mt-2 mt-lg-0 mb-2">
                <select
                  className="form-select form-select-sm ps-4 py-lg-4 py-3 font-16 gamelog-select"
                  aria-label=".form-select-sm example"
                  onChange={onChageDropdown}
                  id="teamDropdown"
                  value={teamId}
                >
                  {ncaafTeamList &&
                    ncaafTeamList.length > 0 &&
                    ncaafTeamList.map((item) => (
                      <option value={item.team_id} key={item.team_id}>
                        {item.team_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <NcaafInjuriesTable teamId={1010} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafInjuries;
