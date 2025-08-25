import { calculate_bmi } from "../../service/GeneralFn";

const AboutPlayerBio = ({ playerDetails }) => {
  var playerNameStr = playerDetails.name;
  if (playerDetails.name) {
    playerNameStr = playerNameStr != "" ? playerNameStr.replace(" ", "<br/>") : "--";
  }

  var playerHg = playerDetails.height;

  return (
    <>
      <div className="row mx-0 w-100 justify-content-center">
        <div className="col-12 d-flex position-relative">
          <div className="player-name-and-rank">
            <h1 className="fw-semibold font-42 text-white text-center">
              <span
                dangerouslySetInnerHTML={{
                  __html: playerNameStr,
                }}
              />
            </h1>
            <h2 className="fw-semibold font-90 text-white mt-4 text-center">
              #{playerDetails.number}
            </h2>
          </div>
          <img
            className="m-auto max-w-520 w-xs-100"
            src={playerDetails.profile_img}
            alt={playerDetails.name}
          />
        </div>
      </div>
      <div className="row w-100 flex-nowrap oveflow-auto-below-xl mx-0 ">
        <div className={`col-6 col-sm-4 col-lg-2 px-0 profile-player-blue-about-box `}>
          <h4 className="font-38 fw-semibold text-white">{playerHg}</h4>
          <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">
            HEIGHT{" "}
          </h6>
        </div>

        <div className={`col-6 col-sm-4 col-lg-2 px-0 fade-black-bg-about-player`}>
          <h4 className="font-38 fw-semibold text-white">
            {playerDetails.drafted ? playerDetails.drafted : "--"}
          </h4>
          <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">
            DRAFT PICK{" "}
          </h6>
        </div>

        <div className={`col-6 col-sm-4 col-lg-2 px-0 profile-player-blue-about-box `}>
          <h4 className="font-38 fw-semibold text-white">
            {playerDetails.weight ? playerDetails.weight : "--"}
          </h4>
          <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">
            WEIGHT{" "}
          </h6>
        </div>

        <div className={`col-6 col-sm-4 col-lg-2 px-0 fade-black-bg-about-player`}>
          <h4 className="font-38 fw-semibold text-white lineClmp" title={playerDetails.college}>
            {playerDetails.college ? playerDetails.college : "--"}
          </h4>
          <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">
            COLLEGE{" "}
          </h6>
        </div>

        <div className={`col-6 col-sm-4 col-lg-2 px-0 profile-player-blue-about-box `}>
          <h4 className="font-38 fw-semibold text-white">
            {calculate_bmi(playerDetails.weight, playerDetails.height)}
          </h4>
          <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">BMI </h6>
        </div>

        <div className={`col-6 col-sm-4 col-lg-2 px-0 fade-black-bg-about-player`}>
          <h4 className="font-38 fw-semibold text-white">{playerDetails.age}</h4>
          <h6 className="fw-light font-16 text-white text-uppercase letter-spacing-5 mb-0">AGE </h6>
        </div>
      </div>
    </>
  );
};

export default AboutPlayerBio;
