import { useEffect, useState } from "react";
import { getTeamRankingListApi } from "../../service/NcaaService";

const RankingTable = () => {
  const [teamRankingListAP, set_teamRankingListAP] = useState({});
  const [teamRankingListCoaches, set_teamRankingListCoaches] = useState({});

  useEffect(() => {
    async function getTeamRankingList() {
      getTeamRankingListApi().then(function (result) {
        const response = result.data.response_data;
        set_teamRankingListAP(response.AP);
        set_teamRankingListCoaches(response.Coaches);
      });
    }
    getTeamRankingList();
  }, []);

  return (
    <>
      <section className="pb-5 mb-5">
        <div className="container">
          <div className="row mt-lg-3">
            <div className="col-12 col-lg-6 px-xl-5 px-lg-4 px-3">
              <div className="text-center z-5 pt-5 mt-5">
                <h1 className="font-42 white fw-bold text-uppercase ranking-headings-custom-mb">
                  AP TOP
                </h1>
                <div className="position-relative me-5">
                  <span className=" fst-italic font-142 fw-bold ncaaf-bg-2020 font-web lh-1">
                    25
                  </span>
                  <span className="position-absolute fst-italic fw-bold font-142 ncaaf-bg-2020-shadow font-web">
                    25
                  </span>
                </div>
              </div>
              <div className="bg-white mt-5 table-responsive text-nowrap mb-0">
                <table className="table caption-top table-striped mb-0">
                  <thead>
                    <tr>
                      <th className="font-16 fw-semibold" scope="col">
                        {" "}
                        RK{" "}
                      </th>
                      <th className="font-16 fw-semibold min-width-200" scope="col">
                        {" "}
                        TOTAL YARDS{" "}
                      </th>
                      <th className="font-16 fw-semibold ranking-custom-w-100" scope="col">
                        {" "}
                        REC{" "}
                      </th>
                      <th className="font-16 fw-semibold ranking-custom-w-100" scope="col">
                        {" "}
                        PTS{" "}
                      </th>
                      <th className="font-16 fw-semibold ranking-custom-w-100" scope="col">
                        {" "}
                        TREND{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamRankingListAP &&
                      teamRankingListAP.length > 0 &&
                      teamRankingListAP.map((item, index) => (
                        <tr key={`Ap${index}`}>
                          <td className="text-start font-18 border-0 py-4 opacity-75 ps-4 line-height-50">
                            {index + 1}
                          </td>
                          <td className="text-start font-16 blue border-0 py-4">
                            <img
                              className="me-3"
                              src={item.teamDetails.logo_standard}
                              alt={item.teamDetails.team_name}
                              width="35px"
                            />
                            {item.teamDetails.team_name}&nbsp;
                            {/* <span className="black">({item.team_position})</span> */}
                          </td>
                          <td className="text-start font-16 border-0 py-4">{item.record}</td>
                          <td className="text-start font-16 border-0 py-4">{item.team_points}</td>
                          <td className="text-start font-16 green border-0 py-4">
                            {parseInt(item.prev_rank) > 0 ? (
                              <span className="text-green opacity-75"> {item.prev_rank}</span>
                            ) : (
                              <span className="text-red ms-2">{item.prev_rank}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-12 col-lg-6 px-xl-5 px-lg-4 px-3">
              <div className="text-center z-5 pt-5 mt-5">
                <h1 className="font-42 white fw-bold text-uppercase ranking-headings-custom-mb">
                  COACHES
                </h1>
                <div className="position-relative me-5">
                  <span className=" fst-italic font-142 fw-bold ncaaf-bg-2020 font-web lh-1">
                    POOL
                  </span>
                  <span className="position-absolute fst-italic fw-bold font-142 ncaaf-bg-2020-shadow font-web">
                    POOL
                  </span>
                </div>
              </div>
              <div className="bg-white mt-5 table-responsive text-nowrap mb-0">
                <table className="table caption-top table-striped mb-0">
                  <thead>
                    <tr>
                      <th className="font-16 fw-semibold" scope="col">
                        {" "}
                        RK{" "}
                      </th>
                      <th className="font-16 fw-semibold fw-semibold min-width-200" scope="col">
                        {" "}
                        TOTAL YARDS{" "}
                      </th>
                      <th className="font-16 fw-semibold  ranking-custom-w-100" scope="col">
                        {" "}
                        REC{" "}
                      </th>
                      <th className="font-16 fw-semibold  ranking-custom-w-100" scope="col">
                        {" "}
                        PTS{" "}
                      </th>
                      <th className="font-16 fw-semibold  ranking-custom-w-100" scope="col">
                        {" "}
                        TREND{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamRankingListCoaches &&
                      teamRankingListCoaches.length > 0 &&
                      teamRankingListCoaches.map((item, index) => (
                        <tr key={`Coaches${index}`}>
                          <td className="text-start font-18 border-0 py-4 opacity-75 ps-4 line-height-50">
                            {index + 1}
                          </td>
                          <td className="text-start font-16 blue border-0 py-4">
                            <img
                              className="me-3"
                              src={item.teamDetails.logo_standard}
                              alt={item.teamDetails.team_name}
                              width="35px"
                            />
                            {item.teamDetails.team_name}&nbsp;
                          </td>
                          <td className="text-start font-16 border-0 py-4">{item.record}</td>
                          <td className="text-start font-16 border-0 py-4">{item.team_points}</td>
                          <td className="text-start font-16 green border-0 py-4">
                            {parseInt(item.prev_rank) > 0 ? (
                              <span className="opacity-75"> {item.prev_rank}</span>
                            ) : (
                              <span className="text-red ms-2">{item.prev_rank}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RankingTable;
