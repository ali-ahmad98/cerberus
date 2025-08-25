const NflTeamDetailsTable = () => {
  return (
    <>
      <section className="py-5">
        <div className="container my-5 py-5 gamelog-table">
          <div className="row align-items-lg-end">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-end mb-2 pb-1 text-uppercase">
                <h4 className="font-22 white mb-0">5-2</h4>
                <h4 className="font-22 white mb-0 mx-3 ps-3">1st in AFC East</h4>
                <butoon className="follow_btn">FOLLOW</butoon>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex algn-items-center">
                <h5 className="font-22 white mb-0 team-details-headings text-center text-uppercase fw-semibold">
                  Players
                </h5>
                <h5 className="font-22 mb-0 team-details-headings-2 text-center text-uppercase fw-semibold">
                  Team
                </h5>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="d-flex justify-content-end mt-2 mt-lg-0 mb-2">
                <select
                  className="form-select form-select-sm ps-4 py-4 font-16 gamelog-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>More NFL Teams</option>
                  <option value="team1">Team1</option>
                  <option value="team2">Team2</option>
                  <option value="team3">Team3</option>
                  <option value="team4">Team4</option>
                </select>
                <select
                  className="form-select form-select-sm ms-3 ps-4 py-4 font-16 gamelog-select"
                  aria-label=".form-select-sm example"
                >
                  <option selected>2020 Regular Season</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NflTeamDetailsTable;
