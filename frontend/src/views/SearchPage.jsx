import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MdTagFaces } from "react-icons/md";
import GlobalConfig from "../GlobalConfig";
import {
  getArticleListSearchApi,
  getNewsListSearchApi,
  getPlayerListSearchApi,
  getTeamListSearchApi,
} from "../service/headerSearch";
import { useLocation } from "react-router-dom";
import TeamListSearch from "../components/HeaderSearch/TeamListSearch";
import PlayerListSearch from "../components/HeaderSearch/PlayerListSearch";
import ArticleListSearch from "../components/HeaderSearch/ArticleListSearch";
import NewsListSearch from "../components/HeaderSearch/NewsListSearch";
import { checkLoginOrNotViewSection } from "../service/GeneralFn";
import ColorRingCustomLoader from "../components/common/ColorRingCustomLoader";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchData, set_searchData] = useState(queryParams.get("s"));
  const [isLoader, set_isLoader] = useState(true);

  const [teamListSearch, set_teamListSearch] = useState({});
  const [playerListSearch, set_playerListSearch] = useState({});
  const [articleListSearch, set_articleListSearch] = useState({});
  const [newsListSearch, set_newsListSearch] = useState({});

  var totalDataCount = 0;

  useEffect(() => set_searchData(queryParams.get("s")), []);

  useEffect(() => {
    set_isLoader(true);

    if (checkLoginOrNotViewSection()) {
      getTeamListSearch();
      getPlayerListSearch();
    }

    getNewsListSearch();
    getArticleListSearch();
  }, [searchData]);

  async function getTeamListSearch() {
    getTeamListSearchApi(searchData).then(function (result) {
      const response = result.data;
      set_teamListSearch(response.response_data);
      set_isLoader(false);
    });
  }

  async function getPlayerListSearch() {
    getPlayerListSearchApi(searchData).then(function (result) {
      const response = result.data;
      set_playerListSearch(response.response_data);
      set_isLoader(false);
    });
  }

  async function getArticleListSearch() {
    getArticleListSearchApi(searchData).then(function (result) {
      const response = result.data;
      set_articleListSearch(response.response_data);
      set_isLoader(false);
    });
  }

  async function getNewsListSearch() {
    getNewsListSearchApi(searchData).then(function (result) {
      const response = result.data;
      set_newsListSearch(response.response_data);
      set_isLoader(false);
    });
  }

  if (
    teamListSearch &&
    teamListSearch.nflTeamList &&
    teamListSearch.ncaaTeamList &&
    parseInt(teamListSearch.nflTeamList.length) + parseInt(teamListSearch.ncaaTeamList.length) > 0
  ) {
    totalDataCount +=
      parseInt(teamListSearch.nflTeamList.length) + parseInt(teamListSearch.ncaaTeamList.length);
  }
  if (
    playerListSearch &&
    playerListSearch.nflPlayerList &&
    playerListSearch.ncaaPlayerList &&
    parseInt(playerListSearch.nflPlayerList.length) +
      parseInt(playerListSearch.ncaaPlayerList.length) >
      0
  ) {
    totalDataCount +=
      parseInt(playerListSearch.nflPlayerList.length) +
      parseInt(playerListSearch.ncaaPlayerList.length);
  }
  if (articleListSearch && articleListSearch.length > 0) {
    totalDataCount += articleListSearch.length;
  }
  if (newsListSearch && newsListSearch.length > 0) {
    totalDataCount += newsListSearch.length;
  }

  return (
    <>
      <Helmet>
        <title> {GlobalConfig.SITE_NAME} </title>
        <meta name="description" content={GlobalConfig.SITE_NAME} />
        <meta name="keywords" content={GlobalConfig.SITE_NAME} />
      </Helmet>

      {isLoader ? (
        <ColorRingCustomLoader isLoader={isLoader} />
      ) : (
        <>
          {totalDataCount > 0 ? (
            <>
              {checkLoginOrNotViewSection() && (
                <>
                  <TeamListSearch teamList={teamListSearch} />
                  <PlayerListSearch playerList={playerListSearch} />
                </>
              )}
              <ArticleListSearch articleList={articleListSearch} />
              <NewsListSearch newsList={newsListSearch} />
            </>
          ) : (
            <div className="tls innerMainbg">
              <div className="container customContainer">
                <div className="noData">
                  <p>
                    {" "}
                    <MdTagFaces /> No search data found! <br /> Please try another keyword.
                  </p>{" "}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchPage;
