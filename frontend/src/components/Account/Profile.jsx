import AccLeftSidebar from "./AccLeftSidebar";
import logindotImg from "../../Assets/images/logindot.png";
import cameraImg from "../../Assets/images/camera.png";
import profileuserImg from "../../Assets/images/profileuser.png";
import gendrImg from "../../Assets/images/gendr.png";
import ageImg from "../../Assets/images/age.png";
import envelopImg from "../../Assets/images/envelop.png";
import playerImg from "../../Assets/images/player.png";
import { useEffect, useState } from "react";
import { updateUserProfile, userProfile } from "../../service/accountService";
import { toast } from "react-toastify";
import GlobalConfig from "../../GlobalConfig";
import noImg from "../../Assets/images/noImg.jpg";

const Profile = () => {
  const [email, set_email] = useState("");
  const [name, set_name] = useState("");
  const [gander, set_gander] = useState("");
  const [age, set_age] = useState("");
  const [imageUpload, set_image] = useState("");
  const [image_path, set_image_path] = useState();
  const [inputErrors, set_inputErrors] = useState({});

  const nameChangeHandler = (e) => set_name(e.target.value);
  const ganderChangeHandler = (e) => set_gander(e.target.value);
  const ageChangeHandler = (e) => set_age(e.target.value);

  const imageChange = (e) => {
    e.preventDefault();

    set_image(e.target.files[0]);
    set_image_path(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    getUserProfileData();
  }, []);

  async function getUserProfileData() {
    userProfile().then(function (result) {
      const response = result.data;
      set_email(response.response_data.email);
      set_name(response.response_data.full_name);
      set_gander(response.response_data.gander);
      set_age(response.response_data.age);
      set_image_path(response.response_data.profile_img);
      // set_image(response.response_data.profile_img)
    });
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    set_inputErrors({});
    var errorNo = 0;
    if (name == "") {
      errorNo += 1;
      set_inputErrors((prevState) => ({ ...prevState, name: "This field is required." }));
    }
    if (gander == "" || gander == undefined) {
      errorNo += 1;
      set_inputErrors((prevState) => ({ ...prevState, gander: "This field is required." }));
    }
    if (!(age > 0)) {
      errorNo += 1;
      set_inputErrors((prevState) => ({ ...prevState, age: "Please enter a correct value." }));
    }

    if (errorNo > 0) {
      return false;
    }

    const formData = new FormData();
    formData.append("image_path", imageUpload);
    formData.append("full_name", name);
    formData.append("gander", gander);
    formData.append("age", age);

    updateUserProfile(formData).then(function (result) {
      try {
        const response = result.data;

        if (response.success) {
          toast.success(response.message, { position: toast.POSITION.TOP_RIGHT });

          localStorage.setItem("ff_LoggedUserName", name);

          window.location.replace(GlobalConfig.WEB_URL + "profile");
          window.location.reload();
        } else {
          set_inputErrors(response.response_data);
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
            <h2>My Profile</h2>
            <img src={logindotImg} alt="" />
          </div>
          <form onSubmit={formSubmitHandler} className="profileAccount">
            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={cameraImg} alt="" /> Photo
              </div>
              <div className="profAccBrgt">
                <div className="imageUpload">
                  <img src={image_path ? image_path : noImg} id="blah" alt="Img" />
                  <div className="uploadInput">
                    <input
                      type="file"
                      id="inputFile"
                      onChange={(e) => imageChange(e)}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={profileuserImg} alt="" /> Name
              </div>
              <div className="profAccBrgt">
                <input
                  type="text"
                  value={name}
                  onChange={nameChangeHandler}
                  className="form-control"
                  placeholder="Mike Manson"
                />
                <p className="text-danger errorTxt">{inputErrors.name}</p>
              </div>
            </div>
            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={gendrImg} alt="" /> Gender
              </div>
              <div className="profAccBrgt">
                <div className="profRadio">
                  <div>
                    <input
                      type="radio"
                      id="test1"
                      name="radio-group"
                      value="Male"
                      onChange={ganderChangeHandler}
                      checked={gander == "Male" ? true : false}
                    />
                    <label for="test1">Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="test2"
                      name="radio-group"
                      value="Female"
                      onChange={ganderChangeHandler}
                      checked={gander == "Female" ? true : false}
                    />
                    <label for="test2">Female</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="test3"
                      name="radio-group"
                      value="Other"
                      onChange={ganderChangeHandler}
                      checked={gander == "Other" ? true : false}
                    />
                    <label for="test3">Other</label>
                  </div>
                </div>
                <p className="text-danger errorTxt">{inputErrors.gander}</p>
              </div>
            </div>
            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={ageImg} alt="" /> Age
              </div>
              <div className="profAccBrgt">
                <input
                  type="text"
                  value={age}
                  onChange={ageChangeHandler}
                  className="form-control"
                  placeholder="35"
                />
                <p className="text-danger errorTxt">{inputErrors.age}</p>
              </div>
            </div>
            <div className="profileAccBlock">
              <div className="profAccBlft">
                <img src={envelopImg} alt="" /> Email
              </div>
              <div className="profAccBrgt">
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  placeholder="MikeManson@gmail.com"
                  disabled
                />
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

export default Profile;
