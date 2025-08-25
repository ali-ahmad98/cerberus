import VideoIcon from "../Navbar/assets/icon.png";

const VideoImg = ({ VideoImg }) => {
  return (
    <div className="videos-img position-relative cursor-pointer">
      <div className="vlbase">
        <img className="w-100 h-100 " src={VideoImg} alt="Video1" />
      </div>

      <div className="position-absolute top-0 h-100 d-flex justify-content-center align-items-center w-100">
        <img className="playicon-img" src={VideoIcon} alt="VideoIcon" />
      </div>
    </div>
  );
};

export default VideoImg;
