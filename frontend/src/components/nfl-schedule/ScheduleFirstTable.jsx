import { useEffect, useState } from "react";
import { nflTeamListApi } from "../../service/thirdPartyDataService";
import { getAllNflSchedulelist } from "./Helper";

const ScheduleFirstTable = () => {
  const currentYear = new Date().getFullYear();

  const [nflTeamListData, set_nflTeamListData] = useState({});

  let yearDropdown = [];
  for (let i = currentYear; i >= 2019; i--) {
    yearDropdown.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const options = [
    {
      label: "Week 1",
      value: "Week 1",
    },
    {
      label: "Week 2",
      value: "Week 2",
    },
    {
      label: "Week 3",
      value: "Week 3",
    },
    {
      label: "Week 4",
      value: "Week 4",
    },
    {
      label: "Week 5",
      value: "Week 5",
    },
    {
      label: "Week 6",
      value: "Week 6",
    },
    {
      label: "Week 7",
      value: "Week 7",
    },
    {
      label: "Week 8",
      value: "Week 8",
    },
    {
      label: "Week 9",
      value: "Week 9",
    },
    {
      label: "Week 10",
      value: "Week 10",
    },
    {
      label: "Week 11",
      value: "Week 11",
    },
    {
      label: "Week 12",
      value: "Week 12",
    },
    {
      label: "Week 13",
      value: "Week 13",
    },
    {
      label: "Week 14",
      value: "Week 14",
    },
    {
      label: "Week 15",
      value: "Week 15",
    },
    {
      label: "Week 16",
      value: "Week 16",
    },
    {
      label: "Week 17",
      value: "Week 17",
    },
    {
      label: "Week 18",
      value: "Week 18",
    },
    {
      label: "Week 19",
      value: "Week 19",
    },
    {
      label: "Week 20",
      value: "Week 20",
    },
    {
      label: "Week 21",
      value: "Week 21",
    },
    {
      label: "Week 22",
      value: "Week 22",
    },
    {
      label: "Week 23",
      value: "Week 23",
    },
    {
      label: "Week 24",
      value: "Week 24",
    },
    {
      label: "Week 25",
      value: "Week 25",
    },
    {
      label: "Week 26",
      value: "Week 26",
    },
    {
      label: "Week 27",
      value: "Week 27",
    },
    {
      label: "Week 28",
      value: "Week 28",
    },
    {
      label: "Week 29",
      value: "Week 29",
    },
    {
      label: "Week 30",
      value: "Week 30",
    },
    {
      label: "Week 31",
      value: "Week 31",
    },
    {
      label: "Week 32",
      value: "Week 32",
    },
    {
      label: "Week 33",
      value: "Week 33",
    },
    {
      label: "Week 34",
      value: "Week 34",
    },
    {
      label: "Week 35",
      value: "Week 35",
    },
    {
      label: "Week 36",
      value: "Week 36",
    },
    {
      label: "Week 37",
      value: "Week 37",
    },
    {
      label: "Week 38",
      value: "Week 38",
    },
    {
      label: "Week 39",
      value: "Week 39",
    },
    {
      label: "Week 40",
      value: "Week 40",
    },
    {
      label: "Week 41",
      value: "Week 41",
    },
    {
      label: "Week 42",
      value: "Week 42",
    },
    {
      label: "Week 43",
      value: "Week 43",
    },
    {
      label: "Week 45",
      value: "Week 45",
    },
    {
      label: "Week 46",
      value: "Week 46",
    },
    {
      label: "Week 47",
      value: "Week 47",
    },
    {
      label: "Week 48",
      value: "Week 48",
    },
    {
      label: "Week 49",
      value: "Week 49",
    },
    {
      label: "Week 50",
      value: "Week 50",
    },
    {
      label: "Week 51",
      value: "Week 51",
    },
    {
      label: "Week 52",
      value: "Week 52",
    },
  ];

  const onTeam = (v) => {
    getAllNflSchedulelist(v.target.value);
  };

  useEffect(() => {
    async function getNflTeamDataList() {
      nflTeamListApi().then(function (result) {
        const response = result.data;
        set_nflTeamListData(response.response_data);
      });
    }
    getNflTeamDataList();
  }, []);

  let nflTeamDropdown = <option>Loading...</option>;
  if (nflTeamListData && nflTeamListData.length > 0) {
    nflTeamDropdown = nflTeamListData.map((teamRow) => (
      <option key={teamRow._id} value={teamRow._id}>
        {teamRow.team_name}
      </option>
    ));
  }

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column flex-xxl-row justify-content-between ">
          <div className="d-sm-flex justify-content-xxl-end px-4 px-sm-0 order-1 order-xxl-2">
            <select
              className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
              aria-label=".form-select-sm example"
            >
              {yearDropdown}
            </select>
            <select
              className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
              aria-label=".form-select-sm example"
            >
              <option>Week</option>

              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
            <select
              className="form-select form-select-sm ms-sm-3  ps-4 py-sm-4 py-3 font-16 sellect mb-sm-5 mb-4"
              aria-label=".form-select-sm example"
              onChange={onTeam}
            >
              <option>Team name</option>
              {nflTeamDropdown}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleFirstTable;
