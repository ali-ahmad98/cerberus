import { aboutTeamPlayerBioList } from "./Helper";

const TeamStatsList = () => {
  return (
    <>
      <div className="container container-standings">
        <div className="mt-4 pt-3 text-center">
          <button className="text-uppercase font-11 fw-normal team_detail_btn_statistics follow_btn">
            Full Team Statistics
          </button>
        </div>
        <div className="pt-lg-5 mt-lg-4">
          <div className="table_heading d-flex flex-column justify-content-center mx-auto mt-5">
            <h2 className="text-center mw_400 white font-22 fw-semibold text-uppercase">
              Team stats
            </h2>
          </div>
        </div>
        <div className="row justify-content-center w-100 flex-nowrap oveflow-auto-below-xl mx-0 pt-5 mt-lg-5 team_leaders_overflow">
          {aboutTeamPlayerBioList.map((obj, index) => (
            <div
              key={index}
              className={`col-6 col-sm-4 col-md-3 col-lg-2 px-0  ${
                index % 2 !== 0 ? "fade-black-bg-about-player" : "profile-player-blue-about-box"
              }`}
            >
              <h6 className="fw-light font-16 text-white text-uppercase mb-0">
                {obj.descriptionHeading}
              </h6>
              <h4 className="font-38 fw-semibold text-white">{obj.numberUrl}</h4>
              <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">
                {obj.description}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamStatsList;
