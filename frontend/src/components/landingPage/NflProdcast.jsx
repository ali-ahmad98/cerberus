import React, { useEffect } from "react";
import ProdcastListItem from "./ProdcastListItem";
import { getAllPodcastlist } from "../../service/cmsService";

const NflProdcast = ({ podcastsHeading }) => {
  useEffect(() => {
    podcastListData();
  }, []);

  async function podcastListData() {
    getAllPodcastlist("nfl_home", 5).then(function () {});
  }

  return (
    <div className="py-5 mb-5 overflow-hidden">
      <div className="my-4 pb-3 my-5 py-sm-4 py-2 prodcast-heading text-center mx-5 mx-lg-auto ">
        <h2 className="heading font-34 white font-web skew-heading text-uppercase pb-sm-4 pb-2 pt-sm-4 pt-2   my-0">
          {podcastsHeading}
        </h2>
        <span className="first-box d-inline-block"></span>
        <span className="second-box d-inline-block mx-2"></span>
        <span className="third-box d-inline-block"></span>
      </div>
      <div className="mw-1050 mx-auto px-2 ">
        <div className="px-sm-3 px-md-0 pt-4">
          <ProdcastListItem />
        </div>
      </div>
    </div>
  );
};

export default NflProdcast;
