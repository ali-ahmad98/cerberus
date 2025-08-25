import noUserImg from "../../Assets/noImgUser.png";
import { Link } from "react-router-dom";

const OffensiveLeaderTableListItem = ({ id, player, yards }) => {
  const { player_id, profile_img, name, position } = player;

  return (
    <>
      <div
        className={`${
          id % 2 !== 0 && "bg-very-light-grey"
        }  px-5 py-3 d-flex align-items-center justify-content-between`}
      >
        <div className="d-flex align-items-center">
          <span className="grey font-18 fw-light me-5">{id + 1}</span>

          <span>
            <img
              className="player-img-with-grey-border"
              src={profile_img != "" && profile_img != undefined ? profile_img : noUserImg}
              alt={name}
            />
          </span>
          <p className="font-16 fw-normal blue ms-4 mb-0">
            <Link to={`/nfl/player-profile/${player_id}`}> {name}</Link>{" "}
            <span className="grey">{position}</span>
          </p>
        </div>
        <span className="grey font-18 fw-light me-4">{yards}</span>
      </div>
    </>
  );
};

export default OffensiveLeaderTableListItem;
