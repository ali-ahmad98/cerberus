import { useState } from "react";
import logindotImg from "../../Assets/images/logindot.png";
import { userRegistration } from "../../service/authService";
import { toast } from "react-toastify";

const Register = () => {
  const [full_name, set_full_name] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [password, set_password] = useState("");
  const [confirmPassword, set_confirmPassword] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  const nameChangeHandler = (e) => set_full_name(e.target.value);
  const emailChangeHandler = (e) => set_email(e.target.value);
  const phoneChangeHandler = (e) => set_phone(e.target.value);
  const passwordChangeHandler = (e) => set_password(e.target.value);
  const confirmPasswordChangeHandler = (e) => set_confirmPassword(e.target.value);

  const registrationSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      full_name: full_name,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
    };
    if (password != confirmPassword) {
      setInputErrors({ confirmPassword: "Password and confirm password dosn't mach." });
      return false;
    }

    userRegistration(formData).then(function (result) {
      try {
        const response = result.data;

        if (response.success) {
          setInputErrors({});
          set_full_name("");
          set_email("");
          set_phone("");
          set_password("");
          set_confirmPassword("");
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          if (response.message == "Validation Error.") {
            setInputErrors(response.response_data);
          }
          toast.error(response.message, { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="loginRegdform redgFormResponsive">
        <h2>Create Account</h2>
        <img src={logindotImg} alt="" />
        <form method="POST" onSubmit={registrationSubmitHandler} action="">
          <div className="form-group mb-2 mt-4">
            <span className="faIcon">
              <i className="fa-regular fa-user"></i>
            </span>
            <input
              type="text"
              name="full_name"
              className="form-control"
              value={full_name}
              onChange={nameChangeHandler}
              placeholder="Full Name"
            />
            <p className="text-danger errorTxt">{inputErrors.full_name}</p>
          </div>
          <div className="form-group mb-2">
            <span className="faIcon">
              <i className="fa-solid fa-phone"></i>
            </span>
            <input
              type="number"
              name="phone"
              className="form-control"
              value={phone}
              onChange={phoneChangeHandler}
              placeholder="Phone"
            />
            <p className="text-danger errorTxt">{inputErrors.phone}</p>
          </div>
          <div className="form-group mb-2">
            <span className="faIcon">
              <i className="fa-solid fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={emailChangeHandler}
              placeholder="Email Address"
            />
            <p className="text-danger errorTxt">{inputErrors.email}</p>
          </div>
          <div className="form-group mb-2">
            <span className="faIcon">
              <i className="fa-regular fa-lock-keyhole"></i>
            </span>
            {/* <div className="input-group"> */}
            <input
              className="form-control"
              name="password"
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              placeholder="Password"
            />
            <p className="text-danger errorTxt">{inputErrors.password}</p>
            {/* </div> */}
          </div>
          <div className="form-group mb-3">
            <span className="faIcon">
              <i className="fa-regular fa-lock-keyhole"></i>
            </span>
            {/* <div className="input-group"> */}
            <input
              className="form-control"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              placeholder="Confirm Password"
            />
            <p className="text-danger errorTxt">{inputErrors.confirmPassword}</p>
            {/* </div> */}
          </div>
          <button type="submit" className="btn mb-2">
            Sign Up
          </button>
        </form>
        <p className="mt-5">Or sign up with</p>
        <div className="loginSocial">
          <a href="">
            <i className="fa-brands fa-google"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Register;
