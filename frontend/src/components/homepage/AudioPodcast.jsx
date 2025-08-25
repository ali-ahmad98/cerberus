import { useEffect, useState } from "react";
import { getAllPodcastlist } from "../../service/cmsService";
import AudioPlayer from "./AudioPlayer";
const Podcast = ({ viewOn }) => {
  const [podcastList, set_podcastList] = useState([]);

  useEffect(() => {
    const podcastListData = async () => {
      getAllPodcastlist(viewOn).then(function (result) {
        const response = result.data;
        set_podcastList(response.response_data);
      });
    };
    podcastListData();
  }, []);

  return (
    <>
      <section className="innerMainbg">
        <div className="innerBodycontent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="podcastContent">
                  {podcastList && podcastList.length !== 0 ? (
                    podcastList?.map((podcastRow, index) => (
                      <div key={index}>
                        <AudioPlayer
                          favPodId={podcastRow._id}
                          src={podcastRow.audio}
                          img={podcastRow.image}
                          title={podcastRow.title}
                          subTitle={podcastRow.sub_title}
                        />
                      </div>
                    ))
                  ) : (
                    <div>Loading...</div>
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
