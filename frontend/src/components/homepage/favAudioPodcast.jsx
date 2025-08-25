import { useEffect, useState } from "react";
import { getAllFavourite } from "../../service/cmsService";
import FavAudioPlayer from "./favAudioPlayer";

const FavAudioPodcast = () => {
  const [podcastList, set_podcastList] = useState({});

  useEffect(() => {
    podcastListData();
  }, []);

  async function podcastListData() {
    getAllFavourite().then(function (result) {
      const response = result.data;
      const newList = response.response_data[0]?.podcast_id;
      set_podcastList(newList);
    });
  }

  let podcastDataContent = <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
  if (podcastList && podcastList.length > 0) {
    podcastDataContent = podcastList.map((podcastRow, index) => (
      <div key={index}>
        <FavAudioPlayer
          favPodId={podcastRow._id}
          src={podcastRow.audio}
          img={podcastRow.image}
          title={podcastRow.title}
          subTitle={podcastRow.sub_title}
        />
      </div>
    ));
  } else {
    podcastDataContent = (
      <div className="container noData">
        <p style={{ color: "white", textAlign: "center" }}>Data not Found</p>
      </div>
    );
  }

  return (
    <>
      <section className="innerMainbg">
        <div className="innerBodycontent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="podcastContent">{podcastDataContent}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FavAudioPodcast;
