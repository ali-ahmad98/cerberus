import { useEffect, useState } from "react";
import VideoIcon from "../../../src/components/Navbar/assets/icon.png";
import { getAllvideos } from "../../service/cmsService";

const VideoFantacyCard = () => {
  const [allVideolist, setVideoList] = useState([]);

  useEffect(() => {
    async function videoData() {
      getAllvideos().then(function (result) {
        const response = result.data;
        setVideoList(response.response_data);
      });
    }
    videoData();
  }, []);

  return (
    <div className="pb-2 mw-430">
      {allVideolist.slice(1, 2).map((data) => {
        return (
          <div className="video-card my-4">
            <div className="video-card-imgs position-relative">
              <div className="videocard-img">
                <img className="w-100" src={data.thumbnail_image} alt="VideoCardImg" />
              </div>
              <div className="position-absolute top-0 h-100 d-flex justify-content-center align-items-center w-100 ">
                <img className="playicon-img cursor-pointer" src={VideoIcon} alt="VideoIcon" />
              </div>
            </div>
            <div className="px-4 min-w-100 py-3 padding-right-xxxl-20 video_fantasy_card">
              <div className="ms-xl-3">
                <p className="font-11 font-web white mb-0 pt-1">{data.created_at}</p>
                <h1 className="font-13 white font-web fw-bold">
                  {data.title}
                  <br className="d-none d-xl-inline-block" />
                  {data.sub_title}
                </h1>
                <p className="white font-12 font-web mb-0 fantasy_para">{data.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoFantacyCard;
