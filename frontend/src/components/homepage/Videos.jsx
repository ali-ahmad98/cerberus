import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../../src/components/Navbar/assets/arrowicon.png";
import LayerImg from "../../components/Navbar/assets/layer.png";
import VideoIcon from "../Navbar/assets/icon.png";
import { getAllvideos } from "../../service/cmsService";
import HeadingDotted from "../common/HeadingDotted";

const Videos = ({ viewOn, videoTitle }) => {
  const [allVideolist, setVideoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState();

  const closeModal = () => setShowModal(false);
  const openModal = (data) => {
    setVideoUrl(data);
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  });

  useEffect(() => {
    videoData();
  }, []);

  async function videoData() {
    getAllvideos(viewOn, 3).then(function (result) {
      const response = result.data;
      setVideoList(response.response_data);
    });
  }

  return (
    <>
      {allVideolist && allVideolist.length > 0 && (
        <div className="position-relative z-index-20 video-sec">
          <div className="position-absolute end-0 bottom-190 ">
            <img className="d-none" src={LayerImg} alt="LayerImg" />
          </div>
          <div className="container pb-md-4 pb-3">
            <div>
              <h1 className="heading white font-web skew-heading text-uppercase">{videoTitle}</h1>
              <HeadingDotted />
            </div>
            <div className="row py-sm-5  py-3">
              <div className="col-xl-12 d-flex align-items-center justify-content-between">
                <div className="row mx-0 w-100 justify-content-center">
                  {allVideolist.map((data, index) => {
                    return (
                      <div className="col-lg-4 col-sm-6 my-3" key={index}>
                        <div className="videos-img position-relative cursor-pointer">
                          <div className="vlbase">
                            <img className="w-100 h-100 " src={data.thumbnail_image} alt="Video1" />
                          </div>
                          <div
                            className="position-absolute top-0 h-100 d-flex justify-content-center align-items-center w-100"
                            onClick={() => openModal(data)}
                          >
                            <img className="playicon-img" src={VideoIcon} alt="VideoIcon" />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {showModal && (
                    <>
                      <div className="modalWrapp" onClick={closeModal}></div>
                      <div className="modalContainer nModal">
                        <button onClick={closeModal} className="closemodicon">
                          X
                        </button>
                        <h2>{videoUrl.title}</h2>
                        <video width="420" height="240" loop="true" autoplay="autoplay" controls>
                          <source src={videoUrl.video} type="video/mp4" />
                        </video>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {allVideolist && allVideolist.length >= 3 && (
              <p className="text-end pb-4 z-index-20 position-relative white font-web font-semibold para respLeft">
                <Link to={`/viewallvideo?page=${viewOn}`} className="cursor-pointer viewAllLink">
                  VIEW ALL VIDEOS{" "}
                  <span className="ms-3">
                    <img src={ArrowIcon} alt="Arrow" />
                  </span>
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Videos;
