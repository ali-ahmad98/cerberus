const FantasyTableItem = ({ item }) => {
  return (
    <>
      <div className="mt-5 pt-5 min-w-260 ">
        <div className="d-flex bg-light-blue2 text-white border-right-custom skew-img1 position-relative">
          <h4 className=" font-14 fw-semibold text-uppercase ps-sm-4 pe-2 ps-2 mb-0 py-4 border-right-custom">
            <span className="d-inline-block pt-1 pe-1">rk</span>
          </h4>
          <h4 className="font-14 fw-semibold text-uppercase ps-2 mb-0 py-4 ps-3">
            <span className="d-inline-block pt-1 ps-sm-4 ps-2"> Name</span>
          </h4>
        </div>

        {item.fantasyTableFixed.map((items, index) => (
          <div key={index} className="d-flex align-items-center justify-content-around bg-white">
            <div className="w-xs-25 border-custom-after ">
              <p className="font-14 mb-0 text-center ">{items.srNo}</p>
            </div>
            <div className="d-flex border-left-custom align-items-center border-bottom w-100 border-right-custom">
              <div className="py-2 ps-3 pe-2">
                <img className="fantasy-table-img my-1" src={items.imgUrl} alt="image" />
              </div>
              <div className="d-flex font-14 flex-column px-2">
                <span className="d-inline-block text-blue pb-sm-2 ">
                  <p className="font-14 mb-0"> {items.teamName}</p>
                </span>
                <span className="d-inline-block text-nowrap">
                  <p className="font-14 mb-0 text-uppercase">{items.teamDesc}</p>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-responsive  pt-5 pe-5">
        <table className="table mt-5 text-center">
          <thead className="text-white gradient-bg custom-transform-skew position-relative skew-img">
            <tr className="px-4 ">
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                team
              </th>
              <th
                className="text-uppercase border-right-custom  border-left-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                pos
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                wk
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                opp
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 "
                scope="col"
              >
                FPTS/G
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                FPTS
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 position-relative text-start"
                scope="col"
              >
                <div className="table-text-2">
                  <span>PASSING</span>
                </div>
                yds
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                td
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                int
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 position-relative"
                scope="col"
              >
                <div className="table-text-3 ">
                  <span>Rushing</span>
                </div>
                yds
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                td
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 position-relative"
                scope="col"
              >
                <div className="table-text-4">
                  <span>RECEIVING</span>
                </div>
                rec
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                yds
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                td
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 position-relative"
                scope="col"
              >
                <div className="table-text-5">
                  <span>Defense</span>
                </div>
                TT
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                AST
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                td
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                sck
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                int
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                ff
              </th>
              <th className="text-uppercase border-bottom-0 font-14 fw-semibold py-4" scope="col">
                fr
              </th>
            </tr>
          </thead>

          <tbody className="bg-white border-top-0 ">
            {item.fantasyFootballTableList.map((obj, index) => (
              <tr key={index}>
                <td className="text-start border-top-0 text-blue text-center font-14 fw-normal px-4">
                  {obj.team}
                </td>
                <td className="text-start border-top-0 text-center font-14 fw-normal px-4">
                  {obj.pos}
                </td>
                <td className="text-start border-top-0 text-center font-14 fw-normal px-4">
                  {obj.wk}
                </td>
                <td className="text-start border-top-0 text-center font-14 fw-normal px-4">
                  {obj.opp}
                </td>
                <td className="text-start bg-blue border-0 text-white text-center font-14 fw-normal px-4">
                  {obj.fptsG}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.fpts}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.yds1}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.td1}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.int}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.yds2}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.td2}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.rec}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.yds3}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.td3}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.tt}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.ast}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.td4}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.sck}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.int2}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.ff}
                </td>
                <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                  {obj.fr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FantasyTableItem;
