import ScroreBoard from "..//homepage/ScroreBoard";
import AboutPlayerBio from "../playerProflie/AboutPlayerBio";
import AboutPlayerBioNcaa from "./AboutPlayerBioNcaa";

const PlayerProfileHero = ({ playerDetails, playerType }) => {
  return (
    <div className="profile-player-bg-image d-flex flex-column ">
      <ScroreBoard />
      <div className=" d-flex  justify-content-end align-items-end flex-grow-1  pt-5">
        <div className="container h-100 d-flex flex-column justify-content-center align-items-end">
          {playerType == "nfl" ? (
            <AboutPlayerBio playerDetails={playerDetails} />
          ) : (
            <AboutPlayerBioNcaa playerDetails={playerDetails} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerProfileHero;
