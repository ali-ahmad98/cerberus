import ncaa from "../../Assets/NcaafFrontAssets/ScheduleAssets/images/ncaa.png";

const NcaafSchduleHome = ({
  NcaafHomeHeading,
  NcaafFrontSelectHeading,
  NcaafFrontSelectHeading1,
  NcaafFrontSelectHeading2,
}) => {
  return (
    <>
      <section className="pt-4">
        <div className="container pt-5">
          <div className="row justify-content-center pt-2">
            <div className="col-5 col-md-3 col-xl-2 text-center z-5">
              <img className="w-100" src={ncaa} alt="ncaa.png" />
            </div>
          </div>
          <div className="row pt-4 mt-1">
            <div className="col-12 z-5">
              <h1 className="sub-heading text-center fw-bold text-uppercase mb-3">
                {NcaafHomeHeading}
              </h1>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-12 z-5 col-lg-10 col-xxl-8 d-flex justify-content-between">
              <div className="d-md-flex justify-content-center w-100 px-md-5">
                <select
                  className="form-select schedule_select font-16"
                  aria-label="Default select example"
                >
                  <option selected>{NcaafFrontSelectHeading}</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>

                <select
                  className="form-select my-3 my-md-0 mx-md-3 schedule_select font-16"
                  aria-label="Default select example"
                >
                  <option selected>{NcaafFrontSelectHeading1}</option>
                  <option value="1">2001</option>
                  <option value="2">2002</option>
                  <option value="3">2003</option>
                </select>

                <select
                  className="form-select schedule_select font-16"
                  aria-label="Default select example"
                >
                  <option selected>{NcaafFrontSelectHeading2}</option>
                  <option value="1">Week 11</option>
                  <option value="2">Week 12</option>
                  <option value="3">Week 13</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NcaafSchduleHome;
