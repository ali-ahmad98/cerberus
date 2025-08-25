import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import dnldImg from "../../Assets/images/dnld.png";
import clockImg from "../../Assets/images/clock.png";
import pauseImg from "../../Assets/images/pause.png";
import playicon from "../../Assets/images/playicon.png";
import { userFavPod } from "../../service/authService";
import { getAllFavourite } from "../../service/cmsService";

const FavAudioPlayer = ({ favPodId, src, img, title, subTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [plug, setPlug] = useState(false);
  const [podcastList, set_podcastList] = useState([]);
  const [soundmute, setSoundMute] = useState(true);

  const audioRef = React.createRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function podcastListData() {
      getAllFavourite().then(function (result) {
        const response = result.data;
        const newList = response.response_data[0]?.podcast_id;
        set_podcastList(newList);
      });
    }
    podcastListData();
  }, []);

  const muteSound = () => {
    if (isPlaying || !isPlaying) {
      audioRef.current.muted = true;
      setSoundMute(false);
    }
  };
  const muteSound2 = () => {
    if (isPlaying || !isPlaying) {
      audioRef.current.muted = false;
      setSoundMute(true);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const onHeart = async (id) => {
    const data = {
      podcast_id: id,
      isFavourite: 0,
    };

    if (localStorage.getItem("ff_isLogin")) {
      await userFavPod(data).then(function () {
        try {
          // const response = result.data;
          let checkedData = {};
          checkedData = podcastList.find((item) => item._id === id);
          if (typeof checkedData != "undefined" && Object.keys(checkedData).length > 0) {
            var newList = podcastList.filter((item) => item._id != id);
            set_podcastList(newList);
          } else {
            set_podcastList([...podcastList, { _id: id }]);
          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      navigate("/login", { state: location.pathname });
    }
    window.location.reload();
  };

  useEffect(() => {
    if (duration && Math.round(duration) == Math.round(currentTime)) {
      setPlug(false);
      setIsPlaying(false);
    }
  }, [currentTime]);

  const togglePlay = () => {
    setPlug(true);
    if (isPlaying) {
      audioRef.current.pause();
      setPlug(false);
    } else {
      audioRef.current.play();
      setPlug(true);
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="podcastMain">
      <div className={`theread ${plug && `clickFocus`}`}>
        <img src={img} alt="" style={{ width: "100%", height: "100%" }} />
        <span className={isPlaying ? "pause" : "pause2"}>
          <img src={isPlaying ? pauseImg : playicon} alt="" onClick={togglePlay} />
        </span>
      </div>

      <div className="podAudiobg">
        <div className="podAudioHeading">
          <span>{title}</span>
          <div className="instrumnt">
            <Link href={src} target="_blank">
              <img src={dnldImg} alt="Download" />
            </Link>

            <div onClick={() => onHeart(favPodId)}>
              {podcastList.filter((data) => data._id === favPodId).length > 0 ? (
                <>
                  <input type="checkbox" />
                  <label className="favouriteIcn">
                    <i class="fa-solid fa-heart" style={{ color: "#2192ff" }}></i>
                  </label>
                </>
              ) : (
                <>
                  <input type="checkbox" />
                  <label className="favouriteIcn">
                    <i class="fa-solid fa-heart" style={{ color: "#2192ff" }}></i>
                  </label>
                </>
              )}
            </div>

            <div class="cust">
              {soundmute === true ? (
                <>
                  <div className={`cust ${soundmute && `muteIcon`}`}>
                    <input type="checkbox" />
                    <label>
                      <i class="off fa-light fa-volume-low" onClick={() => muteSound(favPodId)}></i>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className={`cust ${soundmute && `muteIcon`}`}>
                    <input type="checkbox" />
                    <label>
                      <i
                        class="off fa-solid fa-volume-xmark"
                        style={{ color: "#2192ff" }}
                        onClick={() => muteSound2(favPodId)}
                      ></i>
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="podSecondtext">
          {subTitle} <span className="dotbg">&nbsp;</span>
          <img src={clockImg} alt="" />
          &nbsp; <span id="">{formatTime(duration)}</span>
        </div>

        <div>
          <audio ref={audioRef} src={src} />

          <input
            type="range"
            min={0}
            max={Math.round(duration)}
            value={Math.round(currentTime)}
            onChange={handleSeek}
          />

          <div className="audTime">
            <span>{formatTime(Math.round(currentTime))}</span>
            <span>
              remaining time : {formatTime(Math.round(duration) - Math.round(currentTime))}
            </span>

            <span>{formatTime(Math.round(duration))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavAudioPlayer;
