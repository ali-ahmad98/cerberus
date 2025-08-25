import nflLogoImg from "../../Assets/img/nfl-logo-img.png";

const ScoreBoardHero = ({ value }) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-1 pt-5">
        <span>
          <img className="my-3 nflLogoImg" src={nflLogoImg} alt="nflLogoImg" />
        </span>
        <h1 className="font-42 white fw-bold">{value}</h1>
      </div>
    </>
  );
};

export default ScoreBoardHero;
