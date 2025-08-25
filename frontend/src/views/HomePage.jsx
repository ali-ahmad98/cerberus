import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import About from "../components/homepage/About";
import HeroSection from "../components/homepage/HeroSection";
import HighlightsWeek from "../components/homepage/HighlightsWeek";
import NewsSection from "../components/homepage/NewsSection";
import Videos from "../components/homepage/Videos";
import { homePageDataApi } from "../service/homeService";
import GlobalConfig from "../GlobalConfig";
import ScroreBoard from "../components/homepage/ScroreBoard";

const HomePage = () => {
  const [homeData, set_homeData] = useState({});
  useEffect(() => {
    getHomePageData();
  }, []);

  async function getHomePageData() {
    homePageDataApi().then(function (result) {
      const response = result.data;
      set_homeData(response.response_data);
    });
  }

  return (
    <>
      <Helmet>
        <title> {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <ScroreBoard page="HOME" />

      <HeroSection topSectionArticles={homeData.homePageTopSectionArticles} />
      <HighlightsWeek articleData={homeData.highlightsArticles} />
      <Videos viewOn="main_home" videoTitle="Videos" />
      <NewsSection />
      <About />
    </>
  );
};

export default HomePage;
