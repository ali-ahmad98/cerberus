import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Navbar/Header";
import "./components/Navbar/homepage.css";

// NFL Views
import Articles from "./views/Articles";
import FantasyFootballStats from "./views/FantasyFootballStats";
import HomePage from "./views/HomePage";
import NflDraftPage from "./views/NflDraftPage";
import NflSchedule from "./views/NflSchedule";
import NflStandings from "./views/NflStandings";
import NflTeam from "./views/nflTeam";
import ScoreBoardPage from "./views/ScoreBoardPage";
import StatsPage from "./views/StatsPage";
import ArticlesWR from "./views/ArticlesWR";
import Roster from "./components/nfl-team/Roster";
import NflTeamSchedule from "./components/nfl-team/NflTeamSchedule";
import NflTeamDetailStats from "./components/nfl-team/NflTeamDetailsStats";
import InjuriesMain from "./components/nfl-team/InjuriesMain";
import DepthChart from "./components/nfl-team/DepthChart";
import NflPlayerProfilePage from "./views/NflPlayerProfilePage";

// NCAAF Views
import NcaafSchedule from "./views/NcaafSchedule";
import NcaafFrontScoreboard from "./views/NcaafFrontScoreboard";
import NcaafRanking from "./views/NcaafRanking";
import NcaafTeamDetail from "./views/NcaafTeamDetail";
import NcaafFrontfantasyStats from "./views/NcaafFrontfantasyStats";
import NcaafFrontStatsPage from "./views/NcaafFrontStatsPage";
import NcaafFrontTeamPage from "./views/NcaafFrontTeamPage";
import NcaafTeam from "./NcaafFrontComponents/ncaaf-team/NcaafTeam";
import NcaafTeamDetailStat from "./components/NcaafTeamDetailStat/NcaafTeamDetailStat";
import NcaafSeasonLeaders from "./views/NcaafSeasonLeaders";
import NcaafTeamDetailSchedule from "./views/NcaafTeamDetailSchedule";
import NcaafTeamDetailRoster from "./views/NcaafTeamDetailRoster";
import NcaafDepthChart from "./views/NcaafDepthChart";
import NcaafInjuries from "./views/NcaafInjuries";
import NcaaPlayerProfilePage from "./views/NcaaPlayerProfilePage";
import NcaafFrontStandingsIA from "./views/NcaafFrontStandingsIA";
import NcaafHomePage from "./views/NcaafHomePage";

// CMS & Auth
import AboutUs from "./components/Cms/AboutUs";
import CmsCommon from "./components/Cms/CmsCommon";
import Help from "./components/Cms/Help";
import Podcast from "./components/Cms/Podcast";
import ViewAllNflPodcast from "./components/Cms/viewAllNflPodcast";
import ViewAllNcaafPodcast from "./components/Cms/viewAllNcaafPodcast";
import ViewAllMyfavourite from "./components/Cms/viewAllMyfavourite";

import Login_register from "./components/Auth/Login_register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Profile from "./components/Account/Profile";
import ChangePassword from "./components/Account/ChangePassword";

import News from "./components/News/News";
import NewsSearch from "./components/News/NewsSearch";
import ViewallVideo from "./components/homepage/ViewallVideo";
import ArticleViewAll from "./components/Aritcles/ArticleViewAll";
import AritclesDetails from "./components/Aritcles/AritclesDetails";

import NflHomePage from "./views/NflHomePage";
import SearchPage from "./views/SearchPage";
import TestVideo from "./views/test";
import NotFound from "./views/NotFound";

const AppRoutes = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Home & Search */}
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* NFL */}
        <Route path="/nfl" element={<NflHomePage />} />
        <Route path="/nfl/draft" element={<NflDraftPage />} />
        <Route path="/nfl/schedule" element={<NflSchedule />} />
        <Route path="/nfl/team" element={<NflTeam />} />
        <Route path="/nfl/stats" element={<StatsPage />} />
        <Route path="/nfl/fantasy-stats" element={<FantasyFootballStats />} />
        <Route path="/nfl/scoreboard" element={<ScoreBoardPage />} />
        <Route path="/nfl/standings" element={<NflStandings />} />
        <Route path="/nfl/team-details/stats" element={<NflTeamDetailStats />} />
        <Route path="/nfl/team-details/schedule" element={<NflTeamSchedule />} />
        <Route path="/nfl/team-details/roster" element={<Roster />} />
        <Route path="/nfl/team-details/depth-chart" element={<DepthChart />} />
        <Route path="/nfl/team-details/injuries" element={<InjuriesMain />} />
        <Route path="/nfl/player-profile/:playerId" element={<NflPlayerProfilePage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:category" element={<ArticleViewAll />} />
        <Route path="/article/:permalink/:id" element={<AritclesDetails />} />
        <Route path="/nfl/articles-details" element={<ArticlesWR />} />

        {/* NCAAF */}
        <Route path="/ncaaf" element={<NcaafHomePage />} />
        <Route path="/ncaaf/schedule" element={<NcaafSchedule />} />
        <Route path="/ncaaf/scoreboard" element={<NcaafFrontScoreboard />} />
        <Route path="/ncaaf/ranking" element={<NcaafRanking />} />
        <Route path="/ncaaf/team_1" element={<NcaafFrontTeamPage />} />
        <Route path="/ncaaf/team" element={<NcaafTeam />} />
        <Route path="/ncaaf/team-details" element={<NcaafTeamDetail />} />
        <Route path="/ncaaf/team-details/stats" element={<NcaafTeamDetailStat />} />
        <Route path="/ncaaf/team-details/schedule" element={<NcaafTeamDetailSchedule />} />
        <Route path="/ncaaf/team-details/depth-chart" element={<NcaafDepthChart />} />
        <Route path="/ncaaf/team-details/injuries" element={<NcaafInjuries />} />
        <Route path="/ncaaf/team-details/roster" element={<NcaafTeamDetailRoster />} />
        <Route path="/ncaaf/standings" element={<NcaafFrontStandingsIA />} />
        <Route path="/ncaaf/fantasy-stats" element={<NcaafFrontfantasyStats />} />
        <Route path="/ncaaf/stats" element={<NcaafFrontStatsPage />} />
        <Route path="/ncaaf/qbr-leaders" element={<NcaafSeasonLeaders />} />
        <Route path="/ncaaf/player-profile/:playerId" element={<NcaaPlayerProfilePage />} />

        {/* CMS & Videos */}
        <Route path="/news" element={<News />} />
        <Route path="/viewallvideo" element={<ViewallVideo />} />
        <Route path="/news-search" element={<NewsSearch />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<CmsCommon />} />
        <Route path="/terms-and-conditions" element={<CmsCommon />} />
        <Route path="/help" element={<Help />} />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/viewAllNflPodcast" element={<ViewAllNflPodcast />} />
        <Route path="/viewAllNcaafPodcast" element={<ViewAllNcaafPodcast />} />
        <Route path="/viewAllMyfavourite" element={<ViewAllMyfavourite />} />
        <Route path="/test" element={<TestVideo />} />

        {/* Auth & Profile */}
        <Route path="/login" element={<Login_register />} />
        <Route path="/register" element={<Login_register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;
