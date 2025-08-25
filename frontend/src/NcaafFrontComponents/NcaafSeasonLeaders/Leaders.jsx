const Leaders = () => {
  return (
    <>
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center pt-md-5">
              <h1 className="font-42 white fw-bold text-uppercase pt-md-5 pb-4   qbr-table-heading">
                College Football Total QBR - 2020 Season Leaders
              </h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 z-5 col-lg-10 col-xxl-8 d-flex justify-content-between">
              <div className="d-md-flex justify-content-center w-100 px-md-5">
                <select
                  className="form-select my-3 my-md-0 schedule_select font-16 mx-auto mx-md-2"
                  aria-label="Default select example"
                >
                  <option selected>2020</option>
                  <option value="1">2021</option>
                  <option value="2">2022</option>
                  <option value="3">2023</option>
                </select>
                <select
                  className="form-select schedule_select font-16 mx-auto mx-md-0"
                  aria-label="Default select example"
                >
                  <option selected>All Conference</option>
                  <option value="1">All Conference</option>
                  <option value="2">All Conference</option>
                  <option value="3">All Conference</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Leaders;
