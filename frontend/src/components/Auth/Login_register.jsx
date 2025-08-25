import { Link, useLocation, useNavigate } from "react-router-dom";
import logindotImg from "../../Assets/images/logindot.png";
import playerImg from "../../Assets/images/player.png";
import Register from "./Register";
import { useState } from "react";
import { toast } from "react-toastify";
import { userLogin } from "../../service/authService";
import GlobalConfig from "../../GlobalConfig";

const Login_register = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [inputErrors, set_inputErrors] = useState({});

  const emailChangeHandler = (e) => set_email(e.target.value);
  const passwordChangeHandler = (e) => set_password(e.target.value);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    set_inputErrors({});
    let isError = 0;
    if (!email) {
      isError += 1;
      set_inputErrors((prev) => ({ ...prev, email: "This field is required." }));
    }
    if (!password) {
      isError += 1;
      set_inputErrors((prev) => ({ ...prev, password: "This field is required." }));
    }
    if (isError > 0) return false;

    const formData = { email, password };

    try {
      const result = await userLogin(formData);
      const response = result?.data;

      if (response?.success) {
        set_inputErrors({});
        set_email("");
        set_password("");

        localStorage.setItem("ff_isLogin", "true");
        localStorage.setItem("ff_LoggedUserId", response.response_data?._id || "");
        localStorage.setItem("ff_LoggedUserName", response.response_data?.full_name || "");
        localStorage.setItem("ff_LoggedUserEmail", response.response_data?.email || "");
        localStorage.setItem("ff_AuthToken", response.response_data?.userToken || "");

        toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

        if (state) {
          navigate(state);
        } else {
          window.location.replace(GlobalConfig.WEB_URL);
          window.location.reload();
        }
      } else {
        if (response?.message === "Validation Error.") {
          set_inputErrors(response.response_data || {});
        }
        toast.error(response?.message || "Login failed", { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="loginBg">
      <div className="loginmain">
        <div className="switchRegister">
          <span className="orbg">OR</span>
          <h6>Do you have an account?</h6>
          <a className="showClass">Log In</a>
          <p className="mt-2">Or log in with</p>
          <div className="loginSocial">
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <div className="loginRegdform">
          <h2>Welcome back</h2>
          <img src={logindotImg} alt="" />
          <form onSubmit={loginSubmitHandler}>
            <div className="form-group mb-3 mt-4">
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
              <p className="text-danger errorTxt">{inputErrors.email}</p>
            </div>

            <div className="form-group mb-4">
              <span className="faIcon">
                <i className="fa-regular fa-lock-keyhole"></i>
              </span>
              <input
                type="password"
                value={password}
                onChange={passwordChangeHandler}
                className="form-control"
                placeholder="Password"
              />
              <p className="text-danger errorTxt">{inputErrors.password}</p>
            </div>

            <button type="submit" className="btn mb-2">
              Login
            </button>
          </form>
          <Link to="/forgot-password">Forgot Password?</Link>
          <p className="mt-5">Or sign in with</p>
          <div className="loginSocial">
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="regdmain" id="redirectTop">
        <div className="switchRegister">
          <span className="orbg">OR</span>
          <h6>Don’t you have an account?</h6>
          <Link to="#redirectTop" className="showClass">
            Sign Up
          </Link>
          <p className="mt-2">Or sign in with</p>
          <div className="loginSocial">
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>

        <Register />
      </div>

      <div className="player">
        <img src={playerImg} alt="" />
      </div>
    </section>
  );
};

export default Login_register;
