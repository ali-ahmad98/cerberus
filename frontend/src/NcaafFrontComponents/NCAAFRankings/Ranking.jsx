const Ranking = () => {
  var currentYear = new Date().getFullYear();
  return (
    <>
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center pt-md-5">
              <h1 className="font-42 white fw-bold text-uppercase pt-md-5 pb-4">
                College Football Rankings - {currentYear}
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ranking;
