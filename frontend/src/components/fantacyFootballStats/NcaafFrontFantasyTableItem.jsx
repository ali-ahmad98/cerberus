const NcaafFrontFantasyTableItem = ({ allNflList }) => {
  return (
    <>
      <div className="mt-5 pt-5 min-w-280">
        <div className="d-flex align-items-center bg-light-blue2 text-white border-right-custom skew-img1 position-relative   fantasy-rk-name-custom-height">
          <h4 className="font-14 fw-semibold text-uppercase ps-sm-4 pe-2 ps-2 mb-0 py-4 border-right-custom fantasy-rk-name-custom-height d-flex align-items-center justify-content-center rk-text">
            <span className="d-inline-block pt-1 pe-1">rk</span>
          </h4>
          <h4 className="font-14 fw-semibold text-uppercase ps-2 mb-0 py-4 ps-3 fantasy-rk-name-custom-height d-flex align-items-center justify-content-center">
            <span className="d-inline-block pt-1 ps-sm-4 ps-2">Name</span>
          </h4>
        </div>
        {allNflList?.response_data?.NCAA.length != 0 &&
          allNflList?.response_data?.NCAA.map((item, index) => {
            return (
              <div
                className={`d-flex align-items-center justify-content-around ${
                  index <= 4 ? "bg-gray-123" : "bg-white"
                }`}
                key={index}
              >
                <div className="w-xs-25 border-custom-after d-flex align-items-center justify-content-center">
                  <p className="font-14 mb-0 text-center ">{index + 1}</p>
                </div>
                <div className="d-flex border-left-custom align-items-center border-bottom w-100 border-right-custom     custom-max-height-fantasy-table border-custom-after d-flex align-items-center">
                  <div className="py-2 ps-2 ps-sm-3 pe-2">
                    <img
                      className="fantasy-table-img my-1"
                      src={item?.player_details?.profile_img}
                      alt="image"
                    />
                  </div>
                  <div className="d-flex font-14 flex-column px-2">
                    <span className="d-inline-block text-blue pb-sm-2 ">
                      <p className="font-14 mb-0">{item?.player_details?.name} </p>
                    </span>

                    <span className="d-inline-block text-nowrap">
                      <p className="font-14 mb-0 text-uppercase text-dark-gray">
                        <span className="span fw-bold"> </span>
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="table-responsive pt-5 pe-5">
        <table className="table mt-5 text-center">
          <thead className="text-white gradient-bg custom-transform-skew position-relative skew-img     fantasy-rk-name-custom-height">
            <tr className="px-4">
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
                POS
              </th>
              <th
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4"
                scope="col"
              >
                OPP
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
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 position-relative text-center"
                scope="col"
              >
                <div className="table-text-2 d-flex align-items-end">
                  <span className="font-20 fw-semibold">PASSING</span>
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
                className="text-uppercase border-right-custom border-bottom-0 font-14 fw-semibold py-4 position-relative   fantasy-yds-custom-width"
                scope="col-2"
              >
                <div className="table-text-3 d-flex align-items-end">
                  <span className="font-20 fw-semibold">Rushing</span>
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
                <div className="table-text-4 d-flex align-items-end">
                  <span className="font-20 fw-semibold">RECEIVING</span>
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
                <div className="table-text-5 d-flex align-items-end">
                  <span className="font-20 fw-semibold">Defense</span>
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
                ftd
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

          <tbody className="bg-white border-top-0">
            {allNflList?.response_data?.NCAA.length != 0 &&
              allNflList?.response_data?.NCAA.map((item, index) => (
                <tr className={`${index <= 4 ? "bg-gray-123" : ""}`} key={item._id}>
                  <td className="text-start border-top-0 text-blue text-center font-14 fw-normal px-4">
                    {item?.team_details?.team_name}
                  </td>
                  <td className="text-start border-top-0 text-center font-14 fw-normal px-4">
                    {item?.player_details?.position}
                  </td>

                  <td className="text-start border-top-0 text-center font-14 fw-normal px-4">
                    {item?.team_details?.team_id === item?.opponent[0]?.awayTeam?.team_id
                      ? item?.opponent[0]?.homeTeam?.team_name
                      : item?.opponent[0]?.awayTeam?.team_name}
                  </td>
                  <td className="text-start bg-blue border-0 text-white text-center font-14 fw-normal px-4">
                    {item?.ftp_per_game?.toFixed(2)}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {Number(item?.ftp).toFixed(2)}
                  </td>

                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Passing[0]?.yards ? item?.Passing[0]?.yards : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Passing[0]?.passing_touchdowns
                      ? item?.Passing[0]?.passing_touchdowns
                      : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Passing[0]?.interceptions ? item?.Passing[0]?.interceptions : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Rushing[0]?.yards ? item?.Rushing[0]?.yards : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Rushing[0]?.rushing_touchdowns
                      ? item?.Rushing[0]?.rushing_touchdowns
                      : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Receiving[0]?.receptions ? item?.Receiving[0]?.receptions : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Receiving[0]?.receiving_yards
                      ? item?.Receiving[0]?.receiving_yards
                      : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Receiving[0]?.receiving_touchdowns
                      ? item?.Receiving[0]?.receiving_touchdowns
                      : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.total_tackles ? item?.Defense[0]?.total_tackles : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.assisted_tackles ? item?.Defense[0]?.assisted_tackles : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.sacks ? item?.Defense[0]?.sacks : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.fumbles_returned_for_touchdowns
                      ? item?.Defense[0]?.fumbles_returned_for_touchdowns
                      : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.interceptions ? item?.Defense[0]?.interceptions : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.forced_fumbles ? item?.Defense[0]?.forced_fumbles : "0"}
                  </td>
                  <td className="text-start border-top-0  text-center font-14 fw-normal px-4">
                    {item?.Defense[0]?.fumbles_recovered
                      ? item?.Defense[0]?.fumbles_recovered
                      : "0"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default NcaafFrontFantasyTableItem;
