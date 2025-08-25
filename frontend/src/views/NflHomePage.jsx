import { Helmet } from "react-helmet";
import Videos from "../components/homepage/Videos";
import NflFootBallScoreBoard from "../components/landingPage/NflFootBallScoreBoard";
import NflProdcast from "../components/landingPage/NflProdcast";
import GlobalConfig from "../GlobalConfig";
import NflHeaderSection from "../components/homepage/NflHeaderSection";
import ScroreBoard from "../components/homepage/ScroreBoard";

const NflHomePage = () => {
  return (
    <>
      <Helmet>
        <title> NFL | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={`NFL | ${GlobalConfig.SITE_NAME} `} />
        <meta name="keywords" content="" />
      </Helmet>

      <div className="bg-scorepage">
        <ScroreBoard page="NFL" />

        <NflHeaderSection />
        <NflFootBallScoreBoard page="NFL" scoreBoardTitle="nfl football scoreboard" />
        <NflProdcast podcastsHeading="NFL football podcasts" />
        <Videos viewOn="nfl_home" videoTitle="VIDEOS" />
      </div>
    </>
  );
};

export default NflHomePage;
