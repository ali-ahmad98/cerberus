import { ncaafScheduleData } from "./Helper";

const NcaafSchduleTable = () => {
  return (
    <>
      <section className="pb-193 ncaaf_schdule_table ">
        {ncaafScheduleData.map((obj, index) => (
          <div key={index}>
            <div className="ncaaf_schdule_table">
              <div className="container">
                <div className="table_heading d-flex flex-column justify-content-center">
                  <h2 className="text-center mw_400 white font-22 fw-semibold">{obj.date}</h2>
                </div>
              </div>
            </div>
            <div className="pt-3 ncaaf_schdule_table pb-3">
              <div className="container">
                <div className="table-responsive px-4 position-relative ">
                  <table className="table text-nowrap table-striped position-relative z-1 table_bg">
                    <thead>
                      <tr className="py-4 ">
                        <th className="white border-0 ps-5 py-4" scope="col">
                          <h2 className="ps-4 font-16 fw-bold"> MATCHUP</h2>
                        </th>
                        <th className="white border-0 py-4"></th>
                        <th className="white border-0 py-4"></th>
                        <th className="white border-0 py-4 font-16" scope="col">
                          RESULT
                        </th>
                        <th className="white border-0 py-4 font-16" scope="col">
                          PASSING LEADER
                        </th>
                        <th className="white border-0 py-4 font-16" scope="col">
                          RUSHING LEADER
                        </th>
                        <th className="white border-0 py-4 font-16" scope="col">
                          RECEIVING LEADER
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white border-0">
                      {obj.ncaafScheduleTableData.map((item, index) => (
                        <tr key={index}>
                          <>
                            <td className="blue  matchup-row-width text-start font-18 ps-4 ps-sm-5 border-0 py-4">
                              <img className="me-2 mobile_image" src={item.imgUrl} alt="imgUrl" />
                              {item.Eastern}
                            </td>
                            <td className="border-0 width-90 py-4">
                              <h2 className="black font-18 pe-5 opacity-75">AT</h2>
                            </td>
                            <td className="blue text-start font-18 border-0 py-4 custom_width_230">
                              <img className="me-3 mobile_image" src={item.imgUrl2} alt="imgUrl2" />
                              {item.Eastern1}
                            </td>
                            <td className="blue text-start font-18 border-0 py-4 custom_width_230">
                              {item.Eastern2}
                            </td>
                            <td className="blue text-start font-18 border-0 py-4 custom_width_230">
                              {item.Eastern3}
                              {item.westren}
                              {item.number && <span className="black ms-2">{item.number}</span>}
                            </td>
                            <td className="blue text-start font-18 border-0 py-4 custom_width_230">
                              {item.Eastern4}
                              {item.knight && <span className="black ms-2">{item.knight}</span>}
                            </td>
                            <td className="blue text-start font-18 border-0 py-4 custom_width_230">
                              {item.Eastern5}
                              {item.receving && <span className="black ms-2">{item.receving}</span>}
                            </td>
                          </>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default NcaafSchduleTable;
