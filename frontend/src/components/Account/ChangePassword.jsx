import AccLeftSidebar from "./AccLeftSidebar";
import logindotImg from "../../Assets/images/logindot.png";
import lockImg from "../../Assets/images/lock.png";
import playerImg from "../../Assets/images/player.png";
import { useState } from "react";
import { changePassword } from "../../service/accountService";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, set_oldPassword] = useState("");
  const [password, set_password] = useState("");
  const [confirmPassword, set_confirmPassword] = useState("");
  const [inputErrors, set_inputErrors] = useState({});

  const oldPasswordChangeHandler = (e) => set_oldPassword(e.target.value);
  const passwordChangeHandler = (e) => set_password(e.target.value);
  const confirmPasswordChangeHandler = (e) => set_confirmPassword(e.target.value);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    set_inputErrors({});
    var errorNo = 0;
    if (oldPassword == "") {
      errorNo += 1;
      set_inputErrors((prevState) => ({ ...prevState, oldPassword: "This field is required." }));
    }
    if (password == "") {
      errorNo += 1;
      set_inputErrors((prevState) => ({ ...prevState, password: "This field is required." }));
    }
    if (confirmPassword == "") {
      errorNo += 1;
      set_inputErrors((prevState) => ({
        ...prevState,
        confirmPassword: "This field is required.",
      }));
    }
    if (password != confirmPassword) {
      errorNo += 1;
      set_inputErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Password and confirm password dosn't mach.",
      }));
    }
    if (errorNo > 0) {
      return false;
    }

    const formData = {
      oldPassword: oldPassword,
      password: password,
    };
    changePassword(formData).then(function (result) {
      try {
        const response = result.data;

        if (response.success) {
          set_inputErrors({});
          set_oldPassword("");
          set_password("");
          set_confirmPassword("");
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          // if (response.message == "Validation Error.") {
          set_inputErrors(response.response_data);
          // }
          toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <section className="loginBg profileSetting">
        <AccLeftSidebar />

        <div className="profileRight">
          <div className="loginRegdform">
            <h2>Change Password</h2>
            <img src={logindotImg} alt="" />
          </div>
          <form onSubmit={formSubmitHandler} className="profileAccount">
            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={lockImg} alt="" /> Old Password
              </div>
              <div className="profAccBrgt">
                <input
                  type="password"
                  value={oldPassword}
                  onChange={oldPasswordChangeHandler}
                  className="form-control"
                  placeholder="Old Password"
                />
                <p className="text-danger errorTxt">{inputErrors.oldPassword}</p>
              </div>
            </div>

            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={lockImg} alt="" /> New Password
              </div>
              <div className="profAccBrgt">
                <input
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  className="form-control"
                  placeholder="New Password"
                />
                <p className="text-danger errorTxt">{inputErrors.password}</p>
              </div>
            </div>

            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={lockImg} alt="" /> Confirm Password
              </div>
              <div className="profAccBrgt">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  className="form-control"
                  placeholder="Confirm Password"
                />
                <p className="text-danger errorTxt">{inputErrors.confirmPassword}</p>
              </div>
            </div>

            <div className="profileAccBlock">
              <div className="profAccBlft noneResp">&nbsp;</div>
              <div className="profAccBrgt">
                <button className="commonButton">Save</button>
              </div>
            </div>
          </form>
        </div>
        <div className="player pfPlayer">
          <img src={playerImg} alt="" />
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
