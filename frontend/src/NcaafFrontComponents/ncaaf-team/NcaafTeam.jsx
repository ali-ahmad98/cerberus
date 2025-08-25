import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import ncaafLogo from "../../Assets/ncaaf_logo.png";
import ScroreBoard from "../../components/homepage/ScroreBoard";
import NcaafTableTeamFBS from "./NcaafTableTeamFBS";
import { getNcaaTeamListGrApi } from "../../service/NcaaService";
import GlobalConfig from "../../GlobalConfig";
import ColorRingCustomLoader from "../../components/common/ColorRingCustomLoader";

const NcaafTeam = () => {
  const [isLoader, set_isLoader] = useState(true);
  const [ncaaTeamListData, set_ncaaTeamListData] = useState({});

  useEffect(() => {
    async function getNcaaTeamListGr() {
      getNcaaTeamListGrApi().then(function (result) {
        const response = result.data;
        set_ncaaTeamListData(response.response_data[0]);
        set_isLoader(false);
      });
    }
    getNcaaTeamListGr();
  }, []);

  return (
    <>
      <Helmet>
        <title> Teams | NCAA | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={`Teams | NCAA | ${GlobalConfig.SITE_NAME}`} />
        <meta name="keywords" content={`Teams | NCAA | ${GlobalConfig.SITE_NAME}`} />
      </Helmet>
      <div className="schedulehome ncaaf_team_bg d-flex flex-column ">
        <ScroreBoard page="NCAAF" />
        <div className="py-5">
          <div className="d-flex flex-column align-items-center justify-content-center mt-1 pt-5">
            <span>
              <img className="my-3 nflLogoImg" src={ncaafLogo} alt="NCAA Logo" />
            </span>
            <h1 className="font-42 white fw-bold">TEAMS</h1>
          </div>
        </div>
      </div>

      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            {isLoader ? (
              <ColorRingCustomLoader isLoader={isLoader} />
            ) : (
              <NcaafTableTeamFBS ncaaTeamListData={ncaaTeamListData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafTeam;
