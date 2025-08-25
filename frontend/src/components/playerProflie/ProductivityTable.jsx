const ProductivityTable = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center py-5">
          <span className="blue-rectangle  "></span>
          <h2 className="font-22 fw-semibold text-light-blue mb-0 ps-4 ms-2">PRODUCTIVITY</h2>
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
              <th className="py-4 font-14 fw-semibold">RUSH YARDS</th>
              <th className="py-4 font-14 fw-semibold">RECEIVING YARDS</th>
              <th className="py-4 font-14 fw-semibold">RECEPTIONS</th>
              <th className="py-4 font-14 fw-semibold">DROPS</th>
              <th className="py-4 font-14 fw-semibold">TOTAL TDS</th>
              <th className="py-4 font-14 fw-semibold">FANTASY POINTS PER OPPORTUNITY</th>
              <th className="py-4 font-14 fw-semibold">FANTASY POINTS PER GAME</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center custom-table-border">
              <td className="py-0 font-14 fw-normal">155 (77.5 p/g)</td>
              <td className="py-0 font-14 fw-normal">67 (33.5 p/g)</td>
              <td className="py-0 font-14 fw-normal">7 (3.5 p/g)</td>
              <td className="py-0 font-14 fw-normal">0 (0.0% rate)</td>
              <td className="py-0 font-14 fw-normal">4 (8.3% rate)</td>
              <td className="py-0 font-14 fw-normal">1.06</td>
              <td className="py-0 font-14 fw-normal">26.6</td>
            </tr>
            <tr className="text-center custom-table-border">
              <td className="py-0 font-14 fw-normal">#43</td>
              <td className="py-0 font-14 fw-normal">#41</td>
              <td className="py-0 font-14 fw-normal">#47</td>
              <td className="py-0 font-14 fw-normal">#56</td>
              <td className="py-0 font-14 fw-normal">#10</td>
              <td className="py-0 font-14 fw-normal">#29</td>
              <td className="py-0 font-14 fw-normal"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductivityTable;
