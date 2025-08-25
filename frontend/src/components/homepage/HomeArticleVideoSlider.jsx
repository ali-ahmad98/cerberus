import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import noImg from "../../Assets/images/noImg.jpg";
import { NextSliderIcon, PlayIcon, PrevSliderIcon } from "./HomePageIcon";
import { homePageArticleVideosApi } from "../../service/homeService";
import { getArticleDetailsLink } from "../Aritcles/HelperArticle";
import HeadingDotted from "../common/HeadingDotted";

const HomeArticleVideoSlider = () => {
  const [articleSliderData, set_articleSliderData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [playData, set_playData] = useState();
  useEffect(() => {
    getArticleVideos();
  }, []);

  async function getArticleVideos() {
    homePageArticleVideosApi().then(function (result) {
      const response = result.data;
      set_articleSliderData(response.response_data);
    });
  }

  const slider1 = useRef();
  const slider2 = useRef();
  const [state, setState] = useState({
    nav1: null,
    nav2: null,
  });
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const styles = {
    transform: "translateX(50%)",
  };
  const { nav1, nav2 } = state;
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    centerMode: true,
    slidesToShow: 2.5,
    rtl: false,
    focusOnSelect: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const closeModal = () => setShowModal(false);
  const openModal = (data) => {
    set_playData(data);
    setShowModal(true);
  };

  return (
    <div className="poadcast-section  position-relative">
      <div className="container  text-white">
        <div className="row justify-content-center">
          <div className="col-xl-8 mb-3">
            <div className="poadcast-slider-wrapper w-100 h-100 justify-content-center align-items-center d-flex ">
              <div className="rotateCast heading">
                Article
                <div className="rotateDot">
                  <HeadingDotted />
                </div>
              </div>

              <>
                <div className="px-3 flex-grow-1 overflow-hidden">
                  <div className="w-100 py-3">
                    <Slider
                      asNavFor={nav2}
                      ref={(slider) => (slider1.current = slider)}
                      {...settings}
                    >
                      {articleSliderData &&
                        articleSliderData.length > 0 &&
                        articleSliderData.map((value, index) => {
                          return (
                            <div key={index}>
                              <div className=" mx-lg-5 mx-2 poadcastSlider-box cursor-pointer d-flex align-items-center">
                                <div className="content-box">
                                  <Link to={getArticleDetailsLink(value)}>
                                    <h1>{value.title}</h1>
                                  </Link>
                                </div>
                                <img
                                  src={value.thumbnail !== "" ? value.thumbnail : noImg}
                                  className="w-100 proadcastimg"
                                  alt={value.title}
                                />
                                <div
                                  style={styles}
                                  className="play-icon"
                                  onClick={() => openModal(value)}
                                >
                                  {value.video != "" ? <PlayIcon /> : ""}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </Slider>
                  </div>
                </div>

                <div className="arrows ">
                  <div
                    onClick={() => slider2.current.slickNext()}
                    className="next py-3 cursor-pointer arrow"
                  >
                    <NextSliderIcon />
                  </div>
                  <div
                    onClick={() => slider2.current.slickPrev()}
                    className="prev py-3 cursor-pointer arrow"
                  >
                    <PrevSliderIcon />
                  </div>
                </div>
              </>
            </div>
          </div>
          <div className="col-xl-4 col-md-7  mb-3">
            <div className="poadcast-video  cursor-pointer">
              <Slider
                asNavFor={nav1}
                ref={(slider) => (slider2.current = slider)}
                slidesToShow={1}
                slidesToScroll={1}
                swipe={false}
                swipeToSlide={false}
                fade={true}
                arrows={false}
                speed={300}
              >
                {articleSliderData &&
                  articleSliderData.length > 0 &&
                  articleSliderData.map((value, index) => {
                    return (
                      <div key={index}>
                        <div className=" mx-5 poadcastSlider-box cursor-pointer d-flex align-items-center">
                          <div className="content-box">
                            <Link to={getArticleDetailsLink(value)}>
                              <h1>{value.title}</h1>
                            </Link>
                          </div>
                          <img
                            src={value.thumbnail !== "" ? value.thumbnail : noImg}
                            className="w-100 proadcastimg2"
                            alt={value.title}
                          />
                          <div
                            style={styles}
                            className="play-icon"
                            onClick={() => openModal(value)}
                          >
                            {value.video != "" ? <PlayIcon /> : ""}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modalWrapp" onClick={closeModal}></div>
          <div className="modalContainer nModal">
            <button onClick={closeModal} className="closemodicon">
              X
            </button>
            <h2>{playData.title}</h2>
            <video width="320" height="240" loop="true" autoplay="autoplay" controls>
              <source src={playData.video} type="video/mp4" />
            </video>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeArticleVideoSlider;
