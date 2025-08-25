import { useEffect } from "react";
import objectImg from "../../Assets/images/object.png";
import AudioPodcast from "../homepage/AudioPodcast";

import { getAllPodcastlist } from "../../service/cmsService";

const Podcast = () => {
  useEffect(() => {
    podcastListData();
  }, []);

  async function podcastListData() {
    getAllPodcastlist("ncaaf_home").then(function () {});
  }

  return (
    <>
      <section className="innerMainbg">
        <div className="podcastBannerbg">
          <div className="innerShadow">
            <div className="innerDots">
              <div className="innerHeading">
                <img src={objectImg} className="objImg" alt="" />
                <h2>NCAAF Podcasts</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="innerBodycontent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="podcastContent">
                  <AudioPodcast viewOn="ncaaf" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Podcast;
