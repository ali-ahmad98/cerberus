import { teamTableList } from "./Helper";
import teamTableHeadingBg from "../../Assets/NcaafFrontAssets/HomepageAssets/img/team-table-heading.png";

const NcaafTeamTable = () => {
  return (
    <div className="container">
      <div className="row flex-lg-row">
        {teamTableList.map((obj, index) => (
          <div key={index} className="col-lg-6 pe-lg-4">
            {obj.teamTableListItem.map((items, index) => (
              <div key={index} className="table-responsive ps-4 mb-0">
                <table className="table bg-white mb-0">
                  <thead>
                    <th
                      colSpan="10"
                      className={`font-16 text-uppercase border-0 px-0 pb-4 ${
                        index === 0 ? "pt-0" : "pt-0"
                      }`}
                    >
                      <img
                        className="position-absolute table-heading-bg"
                        src={teamTableHeadingBg}
                        alt="teamTableHeadingBg"
                      />
                      <span className="ps-5 d-block border-bottom-1px border-top-custom py-3 text-white fw-semibold text-uppercase position-relative z-5">
                        {items.tableHeading}
                      </span>
                    </th>
                  </thead>
                  <tbody className="border-0">
                    {items.tableContent.map((item, index) => (
                      <tr key={index} className="border-0">
                        <td className="font-16 fw-normal d-flex align-items-center text-start ps-0 py-1 border-0">
                          <div>
                            <span className="d-inline-block">
                              {/* ms-negative-12 */}
                              <img
                                className="table-img-team"
                                src={item.tableFirstTeamImg}
                                alt="tableImg1"
                              />
                            </span>
                          </div>
                          <div className="ps-2">
                            <span className="font-18 fw-light">{item.teamFirstName}</span>
                            <span className="d-block font-13 fw-normal text-blue pt-1">
                              {item.placeLocation}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="py-5 my-sm-5 my-4"></div>
    </div>
  );
};

export default NcaafTeamTable;
