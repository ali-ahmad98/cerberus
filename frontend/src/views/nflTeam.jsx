import { Helmet } from "react-helmet";
import ScroreBoard from "../components/homepage/ScroreBoard";
import ScoreBoardHero from "../components/nfl-scoreboard/ScoreBoardHero";
import NflTeamTable from "../components/nfl-team/NflTeamTable";
import GlobalConfig from "../GlobalConfig";

const nflTeam = () => {
  return (
    <>
      <Helmet>
        <title>Teams | NFL | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={`Teams | NFL | ${GlobalConfig.SITE_NAME}`} />
        <meta name="keywords" content={`Teams | NFL | ${GlobalConfig.SITE_NAME}`} />
      </Helmet>
      <div className="scoreboard-page-bg d-flex flex-column ">
        <ScroreBoard page="NFL" />
        <div className="py-5">
          <ScoreBoardHero value="TEAMS" />
        </div>
      </div>
      <NflTeamTable />
    </>
  );
};

export default nflTeam;
