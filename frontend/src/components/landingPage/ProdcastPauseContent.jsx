import { DotIcon, DownloadIcon, HeartIcon, SmallClockIcon, VolumeIcon } from "../icons/Icons";
import ProdcastRange from "./ProdcastRange";

const ProdcastPauseContent = ({ obj, isPlay }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center ">
        <p className="text-white mb-0 font-22 fw-medium">{obj.audioName} </p>
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
      <div className="d-flex text-white align-items-center mt-3 mb-4">
        <span className="pe-2 ff-gilroy-normal font-20 text-very-light-gray fw-medium">
          The Read
        </span>
        <span className="px-2">
          <DotIcon />
        </span>
        <span className="px-2">
          <SmallClockIcon />
        </span>
        <span className="px-2 ff-gilroy-normal text-very-light-gray  font-17 fw-medium">14:20</span>
      </div>
      <ProdcastRange value={isPlay ? 30 : obj.audioplayerTiming} />
      <div className="d-flex justify-content-between text-white pt-3">
        <p className="font-17  fw-medium ff-gilroy-normal">23:15</p>
        <p className="font-20 fw-medium opacity-75 ff-gilroy-normal mb-0">12:02 min remained</p>
        <p className="font-17   fw-medium ff-gilroy-normal mb-0">35:17</p>
      </div>
    </>
  );
};

export default ProdcastPauseContent;
