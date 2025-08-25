import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import PlayerProfileBottomNews from "../components/playerProflie/PlayerProfileBottomNews";
import PlayerProfileHero from "../components/playerProflie/PlayerProfileHero";
import GlobalConfig from "../GlobalConfig";
import { ncaaPlayerDetailsApi } from "../service/NcaaService";
import GameLogTableNcaa from "../components/playerProflie/GameLogTableNcaa";

const NcaaPlayerProfilePage = () => {
  const params = useParams();
  const playerId = params.playerId;

  const [playerDetails, set_playerDetails] = useState({});

  useEffect(() => {
    async function nflPlayerDetails() {
      ncaaPlayerDetailsApi(playerId).then(function (result) {
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
        <PlayerProfileHero playerDetails={playerDetails} playerType={"ncaa"} />
        <GameLogTableNcaa playerId={playerId} playerDetails={playerDetails} />
        <PlayerProfileBottomNews />
      </div>
    </>
  );
};

export default NcaaPlayerProfilePage;
