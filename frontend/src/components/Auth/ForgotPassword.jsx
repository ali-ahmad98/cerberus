import { useState } from "react";
import logindotImg from "../../Assets/images/logindot.png";
import playerImg from "../../Assets/images/player.png";
import logoImg from "../../Assets/images/logo.png";
import { resetPasswordMail } from "../../service/authService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import GlobalConfig from "../../GlobalConfig";

const ForgotPassword = () => {
  const [email, set_email] = useState("");
  const emailChangeHandler = (e) => set_email(e.target.value);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      email: email,
    };

    resetPasswordMail(formData).then(function (result) {
      try {
        const response = result.data;
        if (response.success) {
          set_email("");
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          window.location.replace(GlobalConfig.WEB_URL);
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
            <h2>Forgot Password</h2>
            <img src={logindotImg} alt="" />
            <form method="POST" onSubmit={formSubmitHandler} action="">
              <div className="form-group mb-4 mt-5">
                <span className="faIcon">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={emailChangeHandler}
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>
              <button type="submit" className="btn mb-2">
                Submit
              </button>
            </form>
            <Link to="/login">Login?</Link>
          </div>
        </div>
        <div className="player">
          <img src={playerImg} alt="" />
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
