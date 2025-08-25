import { useState, useEffect } from "react";
import { getNflDepthChartByTeamIdApi } from "../../service/thirdPartyDataService";
import { Link } from "react-router-dom";

const DepthChartTable = ({ teamId }) => {
  const [nflDepthChartDataList, set_nflDepthChartDataList] = useState({});

  useEffect(() => {
    async function getNflDepthChartByTeamId() {
      getNflDepthChartByTeamIdApi(teamId).then(function (result) {
        const response_data = result.data.response_data;
        set_nflDepthChartDataList(response_data);
      });
    }
    getNflDepthChartByTeamId();
  }, [teamId]);

  return (
    <>
      {nflDepthChartDataList &&
        nflDepthChartDataList.length > 0 &&
        nflDepthChartDataList.map((obj, index) => (
          <div key={`depthCont${index}`}>
            <div className="ps-3 py-2 font-26 fw-semibold ps-4 bg-white pt-4">
              {obj.section_name}
            </div>
            <div className="table-responsive  mb-0">
              <table className="table bg-white mb-0">
                <thead>
                  <tr className="border-top-custom border-bottom-1px">
                    <th className="font-16 fw-semibold" scope="col"></th>
                    <th className="font-16 fw-semibold" scope="col">
                      {" "}
                      STARTER{" "}
                    </th>
                    <th className="font-16 fw-semibold" scope="col">
                      {" "}
                      2ND{" "}
                    </th>
                    <th className="font-16 fw-semibold" scope="col">
                      {" "}
                      3RD{" "}
                    </th>
                    <th className="font-16 fw-semibold" scope="col">
                      {" "}
                      4TH{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {obj.doc.map((item, index1) => (
                    <tr
                      key={`depthRow${index1}`}
                      className={` border-0 ${index1 % 2 == 0 ? "bg-white" : "bg-very-light-grey"}`}
                    >
                      <td className="text-start  border-0 py-4 lh-40 font-16 fw-normal text-light-gray ps-4 ">
                        {item.position_name}
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue">
                        <div className="d-flex align-items-center">
                          <Link to={`/nfl/player-profile/${item.starter_p_id}`}>
                            {item?.starterPlayer?.name}
                          </Link>{" "}
                          &nbsp;
                          <p className="text-danger ps-1 mb-0">
                            {item.position_name != item?.starterPlayer?.position &&
                              item?.starterPlayer?.position}
                          </p>
                        </div>
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue">
                        <div className="d-flex align-items-center">
                          <Link to={`/nfl/player-profile/${item.second_p_id}`}>
                            {item?.secondPlayer?.name}
                          </Link>{" "}
                          &nbsp;
                          <p className="text-danger ps-1 mb-0">
                            {item.position_name != item?.secondPlayer?.position &&
                              item?.secondPlayer?.position}
                          </p>
                        </div>
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue">
                        <div className="d-flex align-items-center">
                          <Link to={`/nfl/player-profile/${item.third_p_id}`}>
                            {item?.thirdPlayer?.name}
                          </Link>{" "}
                          &nbsp;
                          <p className="text-danger ps-1 mb-0">
                            {item.position_name != item?.thirdPlayer?.position &&
                              item?.thirdPlayer?.position}
                          </p>
                        </div>
                      </td>
                      <td className="text-start border-0 py-4 lh-40 font-16 fw-normal text-light-blue">
                        <div className="d-flex align-items-center">
                          <Link to={`/nfl/player-profile/${item.fourth_p_id}`}>
                            {item?.fourthPlayer?.name}
                          </Link>{" "}
                          &nbsp;
                          <p className="text-danger ps-1 mb-0">
                            {item.position_name != item?.fourthPlayer?.position &&
                              item?.fourthPlayer?.position}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </>
  );
};

export default DepthChartTable;
