import { Link } from "react-router-dom";
import ArrowIcon from "../../../src/components/Navbar/assets/arrowicon.png";
import AudioPodcast from "../homepage/AudioPodcast";

const NcaafPodcastListItem = () => {
  return (
    <div>
      <AudioPodcast viewOn="ncaaf" />
      <p className="text-end pb-4 z-index-20 position-relative white font-web font-semibold para respLeft">
        <Link to={`/viewAllNcaafPodcast`} className="cursor-pointer viewAllLink">
          VIEW ALL NCAAF PODCASTS
          <span className="ms-3">
            <img src={ArrowIcon} alt="ArrowIcon" />
          </span>
        </Link>
      </p>
    </div>
  );
};

export default NcaafPodcastListItem;
