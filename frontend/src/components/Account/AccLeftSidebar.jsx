import logindotImg from "../../Assets/images/logindot.png";
import profileuserImg from "../../Assets/images/profileuser.png";
import lockImg from "../../Assets/images/lock.png";
import helpImg from "../../Assets/images/help.png";
import { NavLink } from "react-router-dom";
import GlobalConfig from "../../GlobalConfig";
import { userProfile } from "../../service/accountService";
import { useEffect, useState } from "react";
import noImg from "../../Assets/images/noImg.jpg";

const AccLeftSidebar = () => {
  const [image_path, set_image_path] = useState();

  const ff_LoggedUserName = localStorage.getItem("ff_LoggedUserName");
  const ff_LoggedUserEmail = localStorage.getItem("ff_LoggedUserEmail");

  const logoutHandler = () => {
    localStorage.removeItem("ff_isLogin");
    window.location.replace(GlobalConfig.WEB_URL);
    window.location.reload();
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  async function getUserProfileData() {
    userProfile().then((result) => {
      const response = result.data;
      set_image_path(response.response_data.profile_img);
    });
  }

  return (
    <div className="profileLeft">
      <div className="loginRegdform">
        <h2>Profile</h2>
        <img src={logindotImg} alt="" />
      </div>
      <div className="proBase">
        <div className="profBaseTop">
          <img src={image_path ? image_path : noImg} alt="" />
          <div>
            <h6>{ff_LoggedUserName}</h6>
            <p>{ff_LoggedUserEmail}</p>
          </div>
        </div>

        <div className="profileLftResp">
          <h4>Account</h4>
          <NavLink
            to="/profile"
            className={({ isActive }) => "proList" + (isActive ? " active" : "")}
          >
            <img src={profileuserImg} alt="" /> Edit profile
          </NavLink>
          <NavLink
            to="/change-password"
            className={({ isActive }) => "proList" + (isActive ? " active" : "")}
          >
            <img src={lockImg} alt="" /> Change Password
          </NavLink>

          <h4>Settings</h4>
          <NavLink
            to="/viewAllMyfavourite"
            className={({ isActive }) => "proList" + (isActive ? " active" : "")}
          >
            <span className="favoIcon">
              <i className="fa-regular fa-heart"></i>
            </span>{" "}
            My Favourite
          </NavLink>
          <NavLink to="/help" className={({ isActive }) => "proList" + (isActive ? " active" : "")}>
            <img src={helpImg} alt="" /> Help
          </NavLink>

          <div className="proList" onClick={logoutHandler}>
            <img src={helpImg} alt="" /> Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccLeftSidebar;
