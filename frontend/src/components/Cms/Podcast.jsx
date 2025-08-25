import objectImg from "../../Assets/images/object.png";
import Videos from "../homepage/Videos";
import AudioPodcast from "../homepage/AudioPodcast";

const Podcast = () => {
  return (
    <>
      <section className="innerMainbg">
        <div className="podcastBannerbg">
          <div className="innerShadow">
            <div className="innerDots">
              <div className="innerHeading">
                <img src={objectImg} className="objImg" alt="" />
                <h2>Podcast</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="innerBodycontent">
          <div className="container">
            <AudioPodcast viewOn="general_podcast" />

            <div className="row mb-4">
              <div className="col-md-12">
                <h3>Videos</h3>
              </div>
            </div>

            <Videos viewOn="podcast" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Podcast;
