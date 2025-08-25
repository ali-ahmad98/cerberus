import VideoIcon from "../../../src/components/Navbar/assets/icon.png";
import VideoCardImg from "../../components/Navbar/assets/vidocardimg.png";

const FantasyWeek = () => {
  return (
    <>
      <div className="pb-3 px-4 px-sm-0 px-xxl-5 fantasy-week">
        <div className="video-card d-flex flex-column flex-sm-row align-items-center justify-content-xxl-between my-4">
          <div className="video-card-imgs position-relative">
            <div className="min-w-130 ">
              <img className="w-100 " src={VideoCardImg} alt="VideoCardImg" />
            </div>
            <div className="position-absolute top-0 h-100 d-flex justify-content-center align-items-center w-100 ">
              <img className="playicon-img cursor-pointer" src={VideoIcon} alt="VideoIcon" />
            </div>
          </div>
          <div className="min-w-100 ps-4 ps-sm-5 ps-xxl-4 pe-4 py-4 padding-right-xxxl-20">
            <p className="font-11 font-web white mb-0 pt-1">10/9/2020</p>
            <h1 className="font-13 white font-web fw-bold">
              Fantasy Football Sleepers: <br /> Week 5
            </h1>
            <p className="white font-12 font-web mb-0">
              Fantasy Football Sleepers for Week 5 As the late-great Eddie Van Halen....
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FantasyWeek;
