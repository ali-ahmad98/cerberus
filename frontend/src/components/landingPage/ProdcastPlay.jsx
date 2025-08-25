import React from "react";
import { DotIcon, DownloadIcon, HeartIcon, SmallClockIcon, VolumeIcon } from "../icons/Icons";
import readPause from "../../Assets/img/prodcast-img-2.png";
import pausebuttonImg from "../../Assets/img/pause-btn.png";
import ProdcastRange from "./ProdcastRange";
import { getAllPodcastlist } from "../../service/podcastService";

const ProdcastPlay = () => {
  React.useEffect(() => {
    getAllPodcastlist(() => {});
  });

  return (
    <>
      <div className="row mx-0 px-sm-3 px-md-0 pt-2 pb-4">
        <div className="col-md-2 text-center d-flex align-items-center align-items-md-start flex-column justify-content-center">
          <div className="position-relative mw-custom  bg-overlay">
            <img className="w-100" src={readPause} alt="readPause-img" />
            <img className="prodcast-play-img" src={pausebuttonImg} alt="pausebuttonImg" />
          </div>
        </div>
        <div className="col-md-10  ps-md-5 d-flex flex-column justify-content-center mt-5 mt-md-0">
          <div className="d-flex justify-content-between align-items-center ">
            <p className="text-white mb-0  font-22 fw-medium">F Your Purse</p>
            <div>
              <span className="px-2 cursor-pointer">
                <DownloadIcon />
              </span>
              <span className="px-2 cursor-pointer">
                <HeartIcon />
              </span>
              <span className="px-2 cursor-pointer">
                <VolumeIcon />
              </span>
            </div>
          </div>
          <div className="d-flex text-white align-items-center mt-3">
            <span className="pe-2 ff-gilroy-normal font-20 text-very-light-gray fw-normal">
              The Read
            </span>
            <span className="px-2">
              <DotIcon />
            </span>
            <span className="px-2">
              <SmallClockIcon />
            </span>
            <span className="px-2 ff-gilroy-normal text-very-light-gray  font-20 fw-normal">
              14:20
            </span>
          </div>
          <div className="pt-4">
            <ProdcastRange />
          </div>
          <div className="d-flex justify-content-between text-white pt-3">
            <p className="font-17  fw-medium ff-gilroy-normal mb-0">23:15</p>
            <p className="font-20 fw-medium opacity-75 ff-gilroy-normal">12:02 min remained</p>
            <p className="font-17 fw-medium ff-gilroy-normal mb-0">35:17</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProdcastPlay;
