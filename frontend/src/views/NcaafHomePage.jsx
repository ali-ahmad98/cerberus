import Videos from "../components/homepage/Videos";
import NflFootBallScoreBoard from "../components/landingPage/NflFootBallScoreBoard";
import NcaafPodcast from "../components/landingPage/NcaafPodcast";
import NcaafFrontHeroSection from "../NcaafFrontComponents/NcaafFrontHomepage/NcaafFrontHeroSection";
import { Helmet } from "react-helmet";
import GlobalConfig from "../GlobalConfig";
import ScroreBoard from "../components/homepage/ScroreBoard";

const NcaafHomePage = () => {
  return (
    <>
      <Helmet>
        <title> NCAAF | {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={`NCAAF | ${GlobalConfig.SITE_NAME} `} />
        <meta name="keywords" content="" />
      </Helmet>

      <section className="bg-black2 white">
        <ScroreBoard page="NCAAF" />

        <NcaafFrontHeroSection />
        <NflFootBallScoreBoard page="NCAAF" scoreBoardTitle="college football scoreboard" />
        <NcaafPodcast podcastsHeading="college football podcasts" />
        <div className="pt-5">
          <Videos viewOn="ncaaf_home" videoTitle="Videos" />
        </div>
      </section>
    </>
  );
};

export default NcaafHomePage;
