import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { checkFollowNcaaTeamApi, followNcaaTeamApi } from "../../service/NcaaService";

const NcaaFollowBtn = ({ teamId }) => {
  const ff_isLogin = localStorage.getItem("ff_isLogin");
  const ff_LoggedUserId = localStorage.getItem("ff_LoggedUserId");
  const [isFollow, set_isFollow] = useState("unfollow");

  useEffect(() => {
    async function checkNcaaTeamFollow() {
      checkFollowNcaaTeamApi(teamId, ff_LoggedUserId, "ncaa").then(function (result) {
        const response = result.data;
        set_isFollow(response.response_data);
      });
    }
    checkNcaaTeamFollow();
  }, [teamId]);

  const followNcaaTeamHandler = () => {
    followNcaaTeamApi(teamId, ff_LoggedUserId, "ncaa").then(function (result) {
      const response = result.data;
      if (response.success) {
        set_isFollow(response.response_data);
        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });
      } else {
        toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
      }
    });
  };

  return (
    <>
      {ff_isLogin ? (
        <>
          {isFollow == "follow" ? (
            <button
              className="follow_btn rounded-pill font-14 ms-3"
              onClick={followNcaaTeamHandler}
              style={{ color: "white", background: "#3d98d1" }}
            >
              <FaCheck /> &nbsp; FOLLOWING
            </button>
          ) : (
            <button
              className="follow_btn rounded-pill font-14 ms-3"
              onClick={followNcaaTeamHandler}
            >
              FOLLOW
            </button>
          )}
        </>
      ) : (
        <Link to="/login">
          <button className="follow_btn rounded-pill font-14 ms-3">FOLLOW</button>
        </Link>
      )}
    </>
  );
};

export default NcaaFollowBtn;
