const NcaafFrontSelect = ({
  ncaaffrontSelectheading1,
  ncaaffrontSelectheading2,
  ncaaffrontSelectheading3,
}) => {
  return (
    <>
      <div className="container pb-4">
        <div className="row justify-content-center mt-4">
          <div className="col-12 z-5 col-lg-10 col-xxl-8 d-flex justify-content-between">
            <div className="d-md-flex justify-content-between w-100 px-md-5">
              <select
                className="form-select schedule_select font-16 m-auto"
                aria-label="Default select example"
              >
                <option selected>{ncaaffrontSelectheading1}</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>

              <select
                className="form-select my-3 my-md-0 mx-md-3 schedule_select font-16 m-auto"
                aria-label="Default select example"
              >
                <option selected>{ncaaffrontSelectheading2}</option>
                <option value="1">2001</option>
                <option value="2">2002</option>
                <option value="3">2003</option>
              </select>

              <select
                className="form-select schedule_select font-16 m-auto"
                aria-label="Default select example"
              >
                <option selected>{ncaaffrontSelectheading3}</option>
                <option value="1">Week 11</option>
                <option value="2">Week 12</option>
                <option value="3">Week 13</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafFrontSelect;
