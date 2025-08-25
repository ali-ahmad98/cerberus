const OpportunityTable = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center py-5">
          <span className="blue-rectangle  "></span>
          <h2 className="font-22 fw-semibold text-light-blue mb-0 ps-4 ms-2">OPPORTUNITY</h2>
        </div>
        <div className="px-4 me-2">
          <a className="text-light-blue text-uppercase font-18 fw-light" href="#Analyze">
            Analyze
          </a>
        </div>
      </div>
      <div className="table-responsive px-4">
        <table className="table  bg-white text-nowrap ">
          <thead className="border-top-custom">
            <tr className="text-center custom-table-border bg-very-light-gray">
              <th className="py-4 font-14 fw-semibold">SNAP SHARE</th>
              <th className="py-4 font-14 fw-semibold">OPPORTUNITY SHARE</th>
              <th className="py-4 font-14 fw-semibold">TEAM RUN PLAYS PER GAME</th>
              <th className="py-4 font-14 fw-semibold">CARRIES</th>
              <th className="py-4 font-14 fw-semibold">TARGETS</th>
              <th className="py-4 font-14 fw-semibold">WEIGHTED OPPORTUNITIES</th>
              <th className="py-4 font-14 fw-semibold">RED ZONE TOUCHES</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center custom-table-border">
              <td className="py-0 font-14 fw-normal">83.8%</td>
              <td className="py-0 font-14 fw-normal">80.6%</td>
              <td className="py-0 font-14 fw-normal">27.7 (2.09 pace)</td>
              <td className="py-0 font-14 fw-normal">41 (20.5 p/g)</td>
              <td className="py-0 font-14 fw-normal">9 (4.5 p/g)</td>
              <td className="py-0 font-14 fw-normal">38.7 (19.4 p/g)</td>
              <td className="py-0 font-14 fw-normal">12 (6.0 p/g)</td>
            </tr>
            <tr className="text-center custom-table-border">
              <td className="py-0 font-14 fw-normal">#2</td>
              <td className="py-0 font-14 fw-normal">#3</td>
              <td className="py-0 font-14 fw-normal">#15</td>
              <td className="py-0 font-14 fw-normal">#39</td>
              <td className="py-0 font-14 fw-normal">#49</td>
              <td className="py-0 font-14 fw-normal">#44</td>
              <td className="py-0 font-14 fw-normal">#24</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OpportunityTable;
