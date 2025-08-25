import { BigSkyStandingList, glossaryList } from "./Helper";

const NcaafFrontStandingsAATable = () => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <div className="pb-5 mb-5 IAstanding-table   ps-3 ps-sm-0">
            {BigSkyStandingList.map((item, index) => (
              <div key={index} className="pt-4 pt-sm-5 mt-5 pt-xl-0 mt-xl-0">
                <div className="d-flex flex-column flex-md-row">
                  <div className="table_heading d-flex flex-column justify-content-center w-100 text-nowrap mb-4 mb-md-0">
                    <h2 className="text-center white font-22 fw-semibold mb-0 text-uppercase">
                      {item.standingTableHeading}
                    </h2>
                  </div>
                </div>

                <div className="table-responsive standingIA-table standing-table mb-0">
                  <table class="table bg-white mb-0" key={index}>
                    <thead>
                      <tr>
                        <th className="custom-th-min-width position-relative">
                          <div className="table-text-2 IA-table-text2 IA-table-text22 text-white z-5 h-100">
                            <span className="ps-0"></span>
                          </div>
                        </th>
                        <th
                          className="fw-semibold font-16 py-3 text-center standingAA-custom-content custom_border_left px-5 position-relative"
                          scope="col"
                        >
                          <div className="d-flex align-items-center justify-content-between px-sm-5 mx-auto standingAA-custom-content-child">
                            <span className="d-inline-block py-1">W-L</span>
                            <span className="d-inline-block py-1">PF</span>
                            <span className="d-inline-block py-1">PA</span>
                          </div>
                          <div className="table-text-2 IA-table-text2 conference text-white z-5">
                            <span className="conference-text">CONFERENCE</span>
                          </div>
                        </th>
                        <th
                          className="fw-semibold font-16 py-3 text-center standingIA-custom-width custom_border_left px-sm-5 position-relative"
                          scope="col"
                        >
                          <div className="d-flex align-items-center justify-content-between px-5 power-index mx-5">
                            <span className="d-inline-block py-1">WL</span>
                            <span className="d-inline-block py-1">PF</span>
                            <span className="d-inline-block py-1">PA</span>
                            <span className="d-inline-block py-1">STRK</span>
                          </div>
                          <div className="table-text-3 IA-table-text3 overall text-white z-5">
                            <span>OVERALL</span>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {item.tableBodyList.map((items, index) => (
                        <tr
                          key={index}
                          className={`text-nowrap ${index % 2 !== 0 ? "bg-very-light-grey" : ""}`}
                        >
                          <td
                            colSpan={1}
                            className="border-top-0 text-start py-3 font-18 fw-normal blue lh-60 ps-4 align-middle text-nowrap"
                          >
                            <span className="d-inline-block mx-3">
                              <img className="table-img" src={items.teamImgUrl} alt="tableImg" />
                            </span>
                            <span>{items.teamName}</span>
                          </td>
                          <td
                            colSpan={1}
                            className="border-top-0 text-center text-start py-3 font-16 fw-normal text-light-gray lh-60 align-middle text-nowrap standingAA-custom-content custom_border_left px-sm-5"
                          >
                            <div className="d-flex align-items-center justify-content-between px-5 mx-auto standingAA-custom-content-child">
                              <span className="d-inline-block">{items.win}</span>
                              <span className="d-inline-block">{items.lose}</span>
                              <span className="d-inline-block">{items.tie}</span>
                            </div>
                          </td>
                          <td
                            colSpan={1}
                            className="border-top-0 text-center text-start py-3 font-16 fw-normal text-light-gray lh-60 align-middle text-nowrap standingIA-custom-content custom_border_left px-sm-5"
                          >
                            <div className="d-flex align-items-center justify-content-between px-5 power-index mx-5">
                              <span className="d-inline-block">{items.wl}</span>
                              <span className="d-inline-block">{items.pf}</span>
                              <span className="d-inline-block">{items.pa}</span>
                              <span className="d-inline-block">{items.strk}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            <div className="table-responsive bg-white custom-width-99">
              <table>
                <p className="font-16 fw-light px-5 py-3 grey lh-60 border-top-custom text-nowrap mb-0 me-auto">
                  Standings are updated with the completion of each game.
                </p>
                <div className="border-top-custom text-nowrap me-auto">
                  <div className="d-flex">
                    {glossaryList.map((item, index) => (
                      <div className="glossay-data-table px-3 py-5 border-left-custom" key={index}>
                        <div className="px-4">
                          <h6 className="font-16 fw-semibold mb-0 text-nowrap glossary-title">
                            {item.glosaaryTitle}
                          </h6>
                          {item.glossaryListData.map((item, index) => (
                            <div className="d-flex align-items-center mt-4 text-nowrap" key={index}>
                              {item.glossaryItemName ? (
                                <h6 className="font-16 fw-semibold mb-0 text-uppercase">
                                  {item.glossaryItemName} :
                                </h6>
                              ) : (
                                <div></div>
                              )}
                              <p className="font-16 fw-light grey mb-0 ms-2">
                                {item.glossaryItemData}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NcaafFrontStandingsAATable;
