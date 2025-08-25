import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import logindotImg from "../../Assets/images/logindot.png";
import logoImg from "../../Assets/images/logo.png";
import playerImg from "../../Assets/images/player.png";
import { resetPassword } from "../../service/authService";
import { toast } from "react-toastify";
import GlobalConfig from "../../GlobalConfig";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, set_password] = useState("");
  const [confirmPassword, set_confirmPassword] = useState("");
  const [inputErrors, set_inputErrors] = useState("");

  const passwordChangeHandler = (e) => set_password(e.target.value);
  const confirmPasswordChangeHandler = (e) => set_confirmPassword(e.target.value);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    set_inputErrors({});

    var isError = 0;
    if (password == "") {
      isError += 1;
      set_inputErrors((prevState) => ({ ...prevState, password: "This field is required." }));
    }
    if (confirmPassword == "") {
      isError += 1;
      set_inputErrors((prevState) => ({
        ...prevState,
        confirmPassword: "This field is required.",
      }));
    }
    if (password != confirmPassword) {
      isError += 1;
      set_inputErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Password and confirm password must be same.",
      }));
    }

    if (isError > 0) {
      return false;
    }

    const formData = {
      token: token,
      password: password,
      confirmPassword: confirmPassword,
    };

    resetPassword(formData).then(function (result) {
      try {
        const response = result.data;
        if (response.success) {
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          set_password("");
          set_confirmPassword("");
          set_inputErrors({});
          window.location.replace(GlobalConfig.WEB_URL + "login");
        } else {
          toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <section className="loginBg">
        <div className="loginmain">
          <div className="loginRegdform">
            <div className="forgotLogo">
              <img src={logoImg} alt="" />
            </div>
          </div>
        </div>
        <div className="regdmain">
          <div className="loginRegdform">
            <h2>Reset Password</h2>
            <img src={logindotImg} alt="" />
            <form method="POST" onSubmit={formSubmitHandler} action="">
              <input type="hidden" name="token" value={token} />
              <div className="form-group mb-4 mt-5">
                <span className="faIcon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  className="form-control"
                  placeholder="New Password"
                />
                <p className="text-danger errorTxt">{inputErrors.password}</p>
              </div>
              <div className="form-group mb-4 mt-5">
                <span className="faIcon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                  className="form-control"
                  placeholder="Confirm Password"
                />
                <p className="text-danger errorTxt">{inputErrors.confirmPassword}</p>
              </div>
              <button type="submit" className="btn mb-2">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="player">
          <img src={playerImg} alt="" />
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
