import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LayerImg from "../../components/Navbar/assets/layer.png";
import VideoIcon from "../Navbar/assets/icon.png";
import { getAllvideos } from "../../service/cmsService";
import HeadingDotted from "../common/HeadingDotted";

const ViewallVideo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;

  const [allVideolist, setVideoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const closeModal = () => setShowModal(false);
  const openModal = (data) => {
    setVideoUrl(data);
    setShowModal(true);
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "scroll";
      };
    }
  }, [showModal]);

  // Fetch video data on mount or page change
  useEffect(() => {
    async function videoData() {
      try {
        const result = await getAllvideos(page);
        setVideoList(result?.data?.response_data || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }

    videoData();
  }, [page]);

  return (
    <div className="poadcast-section position-relative">
      <div className="position-absolute end-0 bottom-190">
        <img className="d-none" src={LayerImg} alt="LayerImg" />
      </div>
      <div className="container pb-md-4 pb-3">
        <div className="viewAllvideohnd">
          <div>
            <h1 className="heading white font-web skew-heading text-uppercase">All Videos</h1>
            <HeadingDotted />
          </div>
        </div>
        <div className="row py-sm-5 py-3">
          <div className="col-xl-12 d-flex align-items-center justify-content-between">
            <div className="row mx-0 w-100 justify-content-center">
              {allVideolist.map((data, index) => (
                <div className="col-lg-3 col-sm-6 my-3" key={data._id || index}>
                  <div className="videos-img position-relative cursor-pointer">
                    <div className="vlbase">
                      <img
                        className="w-100 h-100"
                        src={data.thumbnail_image}
                        alt={data.title || "Video"}
                      />
                    </div>
                    {data.video && (
                      <div
                        className="position-absolute top-0 h-100 d-flex justify-content-center align-items-center w-100"
                        onClick={() => openModal(data)}
                      >
                        <img className="playicon-img" src={VideoIcon} alt="VideoIcon" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {showModal && videoUrl && (
                <>
                  <div className="modalWrapp" onClick={closeModal}></div>
                  <div className="modalContainer nModal">
                    <button onClick={closeModal} className="closemodicon">
                      X
                    </button>
                    <h2>{videoUrl.title}</h2>
                    <video width="320" height="240" loop autoPlay controls>
                      <source src={videoUrl.video} type="video/mp4" />
                    </video>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewallVideo;
