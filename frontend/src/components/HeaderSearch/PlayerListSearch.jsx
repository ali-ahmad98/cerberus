import { Link } from "react-router-dom";

const PlayerListSearch = ({ playerList }) => {
  return (
    <>
      {playerList &&
        playerList.nflPlayerList &&
        playerList.ncaaPlayerList &&
        parseInt(playerList.nflPlayerList.length) + parseInt(playerList.ncaaPlayerList.length) >
          0 && (
          <div className="tls innerMainbg">
            <div className="container customContainer">
              <div className="row">
                <h3>Player List</h3>

                {playerList.nflPlayerList &&
                  playerList.nflPlayerList.map((element, index) => (
                    <div className="col-lg-2" key={`nflPlayerS${index}`}>
                      <div className="cardInn">
                        <Link to={`/nfl/player-profile/${element.player_id}`} target="_blank">
                          <img
                            src={element.profile_img}
                            alt={element.name}
                            style={{ width: "100px" }}
                          />
                          <p className="">{element.name}</p>
                        </Link>
                      </div>
                    </div>
                  ))}

                {playerList.ncaaPlayerList &&
                  playerList.ncaaPlayerList.map((element, index) => (
                    <div className="col-lg-2" key={`ncaaPlayerS${index}`}>
                      <div className="cardInn">
                        <Link to={`/ncaaf/player-profile/${element.player_id}`} target="_blank">
                          <img
                            src={element.profile_img}
                            alt={element.name}
                            style={{ width: "100px" }}
                          />
                          <p className="">{element.name}</p>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default PlayerListSearch;
