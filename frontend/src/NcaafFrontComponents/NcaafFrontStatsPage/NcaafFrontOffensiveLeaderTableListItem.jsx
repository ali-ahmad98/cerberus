const NcaafFrontOffensiveLeaderTableListItem = ({ id, player }) => {
  const { playerImage, playerName, team, yds } = player;
  return (
    <>
      <div
        className={`${
          id % 2 !== 0 && "bg-very-light-grey"
        } px-4 px-sm-5 py-3 d-flex align-items-center justify-content-between`}
      >
        <div className="d-flex align-items-center">
          <span className="grey font-18 fw-light me-4 me-sm-5">{id + 1}</span>

          <span>
            <img className="player-img-with-grey-border" src={playerImage} alt="playerimg" />
          </span>
          <p className="font-16 fw-normal blue ms-4 mb-0">
            {playerName} <span className="grey">{team}</span>
          </p>
        </div>
        <span className="grey font-18 fw-light me-4">{yds}</span>
      </div>
    </>
  );
};

export default NcaafFrontOffensiveLeaderTableListItem;
