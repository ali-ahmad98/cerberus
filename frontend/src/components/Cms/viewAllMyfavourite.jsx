import { useEffect, useState } from "react";
import objectImg from "../../Assets/images/object.png";
import FavAudioPodcast from "../homepage/favAudioPodcast";

import { getAllFavourite } from "../../service/cmsService";

const Podcast = () => {
  const [podcastList, set_podcastList] = useState({});

  useEffect(() => {
    async function podcastListData() {
      getAllFavourite().then(function (result) {
        set_podcastList(result.data.response_data);
      });
    }
    podcastListData();
  }, []);

  return (
    <>
      <section className="innerMainbg">
        <div className="podcastBannerbg">
          <div className="innerShadow">
            <div className="innerDots">
              <div className="innerHeading">
                <img src={objectImg} className="objImg" alt="" />
                <h2>My Favourites</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="innerBodycontent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="podcastContent">
                  {podcastList && podcastList.length > 0 ? (
                    <FavAudioPodcast />
                  ) : (
                    <div style={{ color: "white", textAlign: "center" }}>Loading...</div>
                  )}
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
