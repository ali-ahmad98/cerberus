const NflSideLinks = ({ title, linksdata }) => {
  return (
    <>
      <div className="mb-4 pb-3">
        <h2 className="heading font-34 white font-web skew-heading text-uppercase">{title}</h2>
        <span className="first-box d-inline-block"></span>
        <span className="second-box d-inline-block mx-2"></span>
        <span className="third-box d-inline-block"></span>
      </div>
      <div className="pe-3">
        {linksdata.length != 0 &&
          linksdata.response_data.map((obj, index) => (
            <button key={index} className="quick-link-button text-start py-3 px-4 mt-2">
              {obj.quicklink_view_on === "nfl_home" ||
              obj.quicklink_view_on === "nfl_home,ncaaf_home" ? (
                <a href={obj.page_url} target="_blank" rel="noopener noreferrer">
                  <span>{obj.title}</span>
                </a>
              ) : (
                ""
              )}
            </button>
          ))}
      </div>
    </>
  );
};

export default NflSideLinks;
