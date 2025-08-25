import OBJ from "../../Assets/images/object.png";
import dnld from "../../Assets/images/dnld.png";
import heart from "../../Assets/images/heart.png";
import sound from "../../Assets/images/sound.png";
import clock from "../../Assets/images/clock.png";

import pause from "../../Assets/images/pause.png";

import { getAllPodcastlist } from "../../service/cmsService";
import { useEffect, useState } from "react";
import { CurrentStreamTime } from "./CurrentStreamTime";
const Podcast = () => {
  const [faqListData, set_faqListData] = useState({});

  const togglePlaying = () => {
    const myAudio = document.getElementById("audio");
    if (myAudio.paused) {
      myAudio.play();
    } else {
      myAudio.pause();
    }
  };

  useEffect(() => {
    async function getFaqListData() {
      getAllPodcastlist().then(function (result) {
        const response = result.data;
        set_faqListData(response.response_data);
      });
    }
    getFaqListData();
  }, []);

  return (
    <section className="innerMainbg">
      <div className="podcastBannerbg">
        <div className="innerShadow">
          <div className="innerDots">
            <div className="innerHeading">
              <img src={OBJ} className="objImg" alt="" />
              <h2>Podcastss</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="innerBodycontent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="podcastContent">
                {faqListData && faqListData.length > 0
                  ? faqListData.map((faqRow, index) => (
                      <div className="podcastMain">
                        <div className="theread">
                          <img src={faqRow.image} alt="i" />
                          <span className="pause">
                            <img src={pause} alt="" onClick={togglePlaying} />
                          </span>
                        </div>

                        <div className="podAudiobg">
                          <div className="podAudioHeading">
                            <span>{faqRow.title}</span>
                            <div className="instrumnt">
                              <a href={faqRow.audio} download={faqRow.audio}>
                                <img src={dnld} alt="" />
                              </a>
                              <img src={heart} alt="" />
                              <img src={sound} alt="" />
                            </div>
                          </div>
                          <div className="podSecondtext">
                            {faqRow.sub_title}
                            <span className="dotbg">&nbsp;</span>
                            <img src={clock} alt="" />
                            &nbsp; <>{faqRow.podcast_time}</>
                          </div>
                          <div className="rangeBg">
                            <CurrentStreamTime
                              name="audio"
                              src={faqRow.audio}
                              type={"audio"}
                              id="audio"
                            />
                          </div>
                          <div className="remindTime">
                            <span id={"currentTime" + index}></span>
                            <span className="remindAlert">{""}</span>
                            <span>{faqRow.podcast_time}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  : ""}

                <div className="prodPagination">
                  <nav aria-label="...">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <span className="page-link">Previous</span>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item active" aria-current="page">
                        <span className="page-link">2</span>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="podDemo">
                <img src="assets/images/podcastdemo.png" alt="" />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-12">
              <h3>Videos</h3>
              <img src="assets/images/innerdot.png" alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4 mb-3">
              <div className="videoBlock">
                <div className="videoResize">
                  <img src="assets/images/video1.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <div className="videoBlock">
                <div className="videoResize">
                  <img src="assets/images/video2.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mb-3">
              <div className="videoBlock">
                <div className="videoResize">
                  <img src="assets/images/video3.png" alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="video-card">
                <div className="video-card-imgs">
                  <div className="videocard-img videoResize">
                    <img src="assets/images/vcard1.png" alt="" />
                  </div>
                </div>
                <div className="vidCardTxt">
                  <small>10/9/2020</small>
                  <h6>Fantasy Football Sleepers:</h6>
                  <p>Fantasy Football Sleepers for Week 5 As the late-great Eddie Van Halen....</p>
                </div>
              </div>
              <div className="video-card">
                <div className="video-card-imgs">
                  <div className="videocard-img videoResize">
                    <img src="assets/images/vcard1.png" alt="" />
                  </div>
                </div>
                <div className="vidCardTxt">
                  <small>10/9/2020</small>
                  <h6>Fantasy Football Sleepers:</h6>
                  <p>Fantasy Football Sleepers for Week 5 As the late-great Eddie Van Halen....</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 viewallVideo">
              <a href="">
                View all videos <i className="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Podcast;
