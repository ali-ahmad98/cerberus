const EfficiencyTable = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center py-5">
          <span className="blue-rectangle  "></span>
          <h2 className="font-22 fw-semibold text-light-blue mb-0 ps-4 ms-2">EFFICIENCY</h2>
        </div>
        <div className="px-4 me-2">
          <a className="text-light-blue text-uppercase font-18 fw-light">Analyze</a>
        </div>
      </div>
      <div className="table-responsive px-4">
        <table className="table  bg-white text-nowrap ">
          <thead className="border-top-custom">
            <tr className="text-center custom-table-border bg-very-light-gray">
              <th className="py-4 font-14 fw-semibold" scope="col">
                TRUE YARDS PER CARRY
              </th>
              <th className="py-4 font-14 fw-semibold" scope="col">
                YARDS PER TOUCH
              </th>
              <th className="py-4 font-14 fw-semibold" scope="col">
                BREAKAWAY RUNS
              </th>
              <th className="py-4 font-14 fw-semibold" scope="col">
                BREAKAWAY RUN RATE
              </th>
              <th className="py-4 font-14 fw-semibold" scope="col">
                EVADED TACKLES
              </th>
              <th className="py-4 font-14 fw-semibold" scope="col">
                JUKE RATE
              </th>
              <th className="py-4 font-14 fw-semibold" scope="col">
                BEST BALL POINTS ADDED
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center custom-table-border">
              <td className="py-0 font-14 fw-normal">3.8 (3.8 ypc)</td>
              <td className="py-0 font-14 fw-normal">4.6</td>
              <td className="py-0 font-14 fw-normal">0 (0 p/g)</td>
              <td className="py-0 font-14 fw-normal">0.0%</td>
              <td className="py-0 font-14 fw-normal">22 (11.0 p/g)</td>
              <td className="py-0 font-14 fw-normal">45.8%</td>
              <td className="py-0 font-14 fw-normal">36.6 (18.3)</td>
            </tr>

            <tr className="text-center custom-table-border">
              <td className="py-0 font-14 fw-normal">#46</td>
              <td className="py-0 font-14 fw-normal">#34</td>
              <td className="py-0 font-14 fw-normal">#65</td>
              <td className="py-0 font-14 fw-normal">#45</td>
              <td className="py-0 font-14 fw-normal">#18</td>
              <td className="py-0 font-14 fw-normal">#1</td>
              <td className="py-0 font-14 fw-normal">#18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EfficiencyTable;
