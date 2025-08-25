import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import GameLogTable from "../components/playerProflie/GameLogTable";
import PlayerProfileBottomNews from "../components/playerProflie/PlayerProfileBottomNews";
import PlayerProfileHero from "../components/playerProflie/PlayerProfileHero";
import { nflPlayerDetailsApi } from "../service/thirdPartyDataService";
import GlobalConfig from "../GlobalConfig";

const NflPlayerProfilePage = () => {
  const params = useParams();
  const [playerId] = params.playerId;

  const [playerDetails, set_playerDetails] = useState({});

  useEffect(() => {
    async function nflPlayerDetails() {
      nflPlayerDetailsApi(playerId).then(function (result) {
        const response_data = result.data.response_data;
        set_playerDetails(response_data);
      });
    }
    nflPlayerDetails();
  }, [playerId]);

  return (
    <>
      <Helmet>
        <title>
          {" "}
          {playerDetails && playerDetails.name ? playerDetails.name : ""} | {GlobalConfig.SITE_NAME}{" "}
        </title>
        <meta
          name="description"
          content={`${playerDetails && playerDetails.name ? playerDetails.name : ""} | ${
            GlobalConfig.SITE_NAME
          } `}
        />
        <meta
          name="keywords"
          content={`${playerDetails && playerDetails.name ? playerDetails.name : ""} | ${
            GlobalConfig.SITE_NAME
          } `}
        />
      </Helmet>

      <div className="player-profile-bg">
        <PlayerProfileHero playerDetails={playerDetails} playerType={"nfl"} />
        <GameLogTable playerId={playerId} playerDetails={playerDetails} />
        <PlayerProfileBottomNews />
      </div>
    </>
  );
};

export default NflPlayerProfilePage;
