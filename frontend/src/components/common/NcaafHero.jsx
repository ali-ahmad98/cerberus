const NcaafHero = ({ value, logo, team }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-1 pt-5 pb-4 pb-sm-0">
      <span>
        {logo && logo !== "" && (
          <img className="my-3 nflLogoImg" style={{ width: "120px" }} src={logo} alt={value} />
        )}
      </span>
      <h1 className="font-42 white fw-bold"> {team && team !== "" ? team : "Loading..."}</h1>
    </div>
  );
};

export default NcaafHero;
