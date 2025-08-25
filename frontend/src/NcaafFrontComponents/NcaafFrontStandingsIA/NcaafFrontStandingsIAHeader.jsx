const NcaafFrontStandingsIAHeader = ({ FrontStandingsIAHeading }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 text-center position-relative z-5 py-sm-5 my-sm-5">
            <h1 className="font-42 white fw-bold mt-5 mt-sm-0 pt-5 py-sm-5 text-uppercase custom-text-shadow">
              {FrontStandingsIAHeading}
            </h1>
            <span className="position-absolute fst-italic fw-bold standing-bg-2020 font-web">
              {currentYear}
            </span>
            <span className="position-absolute fst-italic fw-bold standing-bg-2020-shadow font-web">
              {currentYear}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafFrontStandingsIAHeader;
