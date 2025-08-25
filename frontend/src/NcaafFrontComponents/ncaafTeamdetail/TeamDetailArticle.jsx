import { SmallRightArrowIcon, SmallWhiteHeartIcon } from "../../components/icons/Icons";

const TeamDetailArticle = ({ playernews }) => {
  return (
    <>
      <div className="team-detail-propspects overflow-y-auto">
        <div
          className="week-5-img position-relative Articles_card  team-table overflow-y-auto mt-5"
          style={{ backgroundImage: `url(${playernews.imagePath})` }}
        >
          <div className="d-flex flex-column col-12 z-10 py-3 py-md-0">
            <h1 className="font-web white fw-medium font-19">{playernews.heading}</h1>
            <p className="font-web white font-14 mb-0">{playernews.description}</p>
            <p className="font-web white font-14 mb-0"> {playernews.match}</p>
          </div>
          <div className="text-end position-absolute small-icons z-10">
            <a className="text-decoration-none" href="">
              <SmallWhiteHeartIcon />
            </a>
            <a className="text-decoration-none" href="">
              <SmallRightArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetailArticle;
