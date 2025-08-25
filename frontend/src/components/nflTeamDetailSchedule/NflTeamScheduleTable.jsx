import { nflTeamStatsList } from "./Helper";

const NflTeamScheduleTable = () => {
  return (
    <div className="container mb-5 schedule-table">
      <div className="row justify-content-end mb-sm-3 pb-xxl-2">
        <div className="col-12 text-end mb-3">
          <div className="d-flex align-items-center justify-content-md-end pt-2 ms-2 ms-md-0">
            <h2 className="font-20 white mb-0">
              5-2 <span className="ms-lg-4 ps-2">1st IN AFC EAST</span>
            </h2>
            <button className="follow_btn rounded-pill font-14 ms-3">FOLLOW</button>
          </div>
        </div>
        <div className="col-12 col-lg-5 d-flex justify-content-lg-end align-items-center mt-3 mt-sm-4 mt-lg-0 mb-3 mb-sm-2">
          <select
            className="form-select form-select-sm ms-lg-3 ps-sm-4 py-sm-4 py-3 font-16 sellect"
            aria-label=".form-select-sm example"
          >
            <option selected>Team Statistics</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <select
            className="form-select form-select-sm ms-2 ms-sm-3 ps-sm-4 py-sm-4 py-3 font-16 sellect"
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

      {nflTeamStatsList.map((obj, index) => (
        <div key={index} className="table-responsive mb-0 bg-white">
          <div className="font-28 fw-semibold ps-4 my-1 border-bottom">{obj.heading}</div>

          <table className="table mb-0">
            <thead>
              <tr className="border-top-0">
                <th className="font-16 fw-semibold text-nowrap ps-4 py-2" scope="col">
                  {obj.subHeading1}
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  {obj.subHeading2}
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  {obj.subHeading3}
                </th>
                <th
                  className={`font-16 fw-semibold text-nowrap ${
                    obj.subHeading4 === "TIME" ? "ps-4 " : "ps-0"
                  } `}
                  scope="col"
                >
                  {obj.subHeading4}
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  {obj.subHeading5}
                </th>
                <th className="font-16 fw-semibold text-nowrap " scope="col">
                  {obj.subHeading6}
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  {obj.subHeading7}
                </th>
                <th className="font-16 fw-semibold text-nowrap" scope="col">
                  {obj.subHeading8}
                </th>
              </tr>
            </thead>
            <tbody>
              {obj.tableContent.map((item, index) => (
                <tr
                  key={index}
                  className={` ${index % 2 == 0 ? "bg-whites" : "bg-very-light-grey"}`}
                >
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray ps-4 lh-49 py-4 sr-no-td">
                    {item.srNo}
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 date-table-td">
                    {item.dateTable}
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 opponent-td">
                    <span>{item.opponentGrey} </span>
                    <img className="ms-3 me-4 opponentgrey" src={item.imgUrl} alt="table-img" />
                    <span className="text-blue">{item.opponentBlue}</span>
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                    <span
                      className={` fw-semobold pe-3 ${
                        item.greenRedText === "W" ? "text-green" : "text-danger"
                      }`}
                    >
                      {item.greenRedText}
                    </span>
                    <span className="text-blue">{item.result}</span>
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5 min-w-101">
                    {item.wL}
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                    <div className="min-w-56">
                      <span className="text-blue me-2">{item.hiPassBlue}</span>
                      <span>{item.hiPassGrey}</span>
                    </div>
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                    <span className="text-blue me-1">{item.hiRushBlue}</span>
                    <span>{item.hiRushGrey}</span>
                  </td>
                  <td className="text-start text-nowrap font-16 fw-light text-very-light-gray pe-5">
                    <div className="min-w-56">
                      <span className="text-blue me-1">{item.hiRecBlue}</span>
                      <span> {item.hiRecGrey} </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <p className="font-18 fw-light text-very-light-gray ps-4 lh-49 py-4 mb-0 bg-white">
        * Game played at neutral location
      </p>
    </div>
  );
};

export default NflTeamScheduleTable;
