import ncaa from "../../Assets/NcaafFrontAssets/ScheduleAssets/images/ncaa.png";

const TeamScoreBoardHero = ({ NcaafTeamHeading }) => {
  return (
    <section className="pt-2">
      <div className="container pt-4">
        <div className="row justify-content-center pt-2">
          <div className="col-5 col-md-3 col-xxl-2 text-center z-5 mb-1">
            <img className="w-100" src={ncaa} alt="ncaa.png" />
          </div>
          <div className="col-12 z-5">
            <h1 className="sub-heading text-center fw-bold text-uppercase mb-3">
              {NcaafTeamHeading}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamScoreBoardHero;
