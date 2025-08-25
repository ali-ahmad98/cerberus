import tableImg5 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img5.svg";
import tableImg6 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img6.svg";
import tableImg7 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img7.svg";
import tableImg8 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img8.svg";
import tableImg9 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img9.svg";
import tableImg10 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img10.svg";
import tableImg11 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img11.svg";
import tableImg12 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img12.svg";
import tableImg13 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img13.svg";
import tableImg14 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img14.svg";
import tableImg15 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img15.svg";
import tableImg16 from "../../Assets/NcaafFrontAssets/HomepageAssets/img/table-Img16.svg";

import { TicketIcon } from "../../components/icons/Icons";
import webApi from "../../WebApi/WebApi";

export const scoreBoardTableList = [
  {
    matchDate: "",
    PLayersWatch: [
      {
        finalText: "10:30 PM",
        imgUrl1: tableImg5,
        imgUrl2: tableImg6,

        FirstNameLetter: "23",
        teamFirstName: " Michigan",
        team1Text: "(1-1, 1-1 Big Ten)",

        SecondNameLetter: "13",
        teamNameSecond: " Indiana",
        team2Text: "(3-4, 1-2 Home)",

        place: "Memorial Stadium (Bloomington, IN) Bloomington, IN",
        temprature: "8° C",

        passBoldText: "Joe Milton",
        passNormalText: " MICH",
        pass: "47-73, 525 YDS, 1 TD",

        rushBoldText: "Hassan Haskins",
        rushNormalText: " MICH",
        rush: "14 CAR, 138 YDS, 3 TD",

        recBoldText: "Whop Philyor",
        recNormalText: " IU",
        rec: "10 REC, 173 YDS, 1 TD",

        gamecast: "GAMECAST",
      },
      {
        finalText: "10:30 PM",
        imgUrl1: tableImg7,
        imgUrl2: tableImg8,

        FirstNameLetter: "18",
        teamFirstName: " SMU",
        team1Text: "(6-1, 3-1 American)",

        SecondNameLetter: "",
        teamNameSecond: "Temple",
        team2Text: "(1-3, 1-3 American)",

        place: "Memorial Stadium (Bloomington, IN) Bloomington, IN",
        temprature: "8° C",

        passBoldText: "Shane Buechele",
        passNormalText: " SMU",
        pass: "165-249, 2226 YDS, 16 TD",

        rushBoldText: "Ulysses Bentley IV",
        rushNormalText: " SMU",
        rush: "115 CAR, 695 YDS, 10 TD",

        recBoldText: "Rashee Rice",
        recNormalText: " SMU",
        rec: "34 REC, 521 YDS, 4 TD",

        ticketIcon: <TicketIcon />,
        ticketRate: "Tickets as low as $150",

        gamecast: "GAMECAST",
      },
      {
        finalText: "10:30 PM",
        imgUrl1: tableImg9,
        imgUrl2: tableImg10,

        FirstNameLetter: "",
        teamFirstName: "Arizona State",
        team1Text: "(0-0, 0-0 Pac-12)",

        SecondNameLetter: "20",
        teamNameSecond: " USC",
        team2Text: "(0-0, 0-0 Pac-12)",

        place: "Memorial Stadium (Bloomington, IN) Bloomington, IN",
        temprature: "8° C",

        // has to change style
        passBoldText: "Arizona State",
        passNormalText: "",
        pass: "Roster  |  Statistics  |  Schedule",

        rushBoldText: "USC",
        rushNormalText: "",
        rush: "Roster  |  Statistics  |  Schedule",

        recBoldText: "",
        recNormalText: "",
        rec: "",
        //

        gamecast: "GAMECAST",
      },
      {
        finalText: "10:30 PM",
        imgUrl1: tableImg11,
        imgUrl2: tableImg12,

        FirstNameLetter: "",
        teamFirstName: "West Virginia",
        team1Text: "(4-2, 3-2 Big 12)",

        SecondNameLetter: "22",
        teamNameSecond: " Texas",
        team2Text: "(4-2, 3-2 Big 12)",

        place: "Memorial Stadium (Bloomington, IN) Bloomington, IN",
        temprature: "8° C",

        passBoldText: "Jarret Doege",
        passNormalText: " WVU",
        pass: "149-232, 1690 YDS, 11 TD",

        rushBoldText: "Leddie Brown",
        rushNormalText: " WVU",
        rush: "126 CAR, 694 YDS, 8 TD",

        recBoldText: "Winston Wright Jr.",
        recNormalText: " WVU",
        rec: "32 REC, 391 YDS, 2 TD",

        ticketIcon: <TicketIcon />,
        ticketRate: "Tickets as low as $150",

        gamecast: "GAMECAST",
      },
      {
        finalText: "10:30 PM",
        imgUrl1: tableImg13,
        imgUrl2: tableImg14,

        FirstNameLetter: "25",
        teamFirstName: " Liberty",
        team1Text: "(6-0)",

        SecondNameLetter: "",
        teamNameSecond: "Virginia Tech",
        team2Text: "(4-2)",

        place: "Memorial Stadium (Bloomington, IN) Bloomington, IN",
        temprature: "8° C",

        passBoldText: "Malik Willis",
        passNormalText: " LIB",
        pass: "88-131, 1122 YDS, 9 TD",

        rushBoldText: "Khalil Herbert",
        rushNormalText: " VT",
        rush: "96 CAR, 803 YDS, 6 TD",

        recBoldText: "DJ Stubbs",
        recNormalText: " LIB",
        rec: "27 REC, 375 YDS, 3 TD",

        gamecast: "GAMECAST",
      },
    ],
  },
  {
    matchDate: "Saturday, 8th November",
    PLayersWatch: [
      {
        finalText: "10:30 PM",
        imgUrl1: tableImg15,
        imgUrl2: tableImg16,

        FirstNameLetter: "23",
        teamFirstName: " Michigan",
        team1Text: "(1-1, 1-1 Big Ten)",

        SecondNameLetter: "13",
        teamNameSecond: " Indiana",
        team2Text: "(3-4, 1-2 Home)",

        place: "Memorial Stadium (Bloomington, IN) Bloomington, IN",
        temprature: "8° C",

        passBoldText: "Joe Milton",
        passNormalText: " MICH",
        pass: "47-73, 525 YDS, 1 TD",

        rushBoldText: "Hassan Haskins",
        rushNormalText: " MICH",
        rush: "14 CAR, 138 YDS, 3 TD",

        recBoldText: "Whop Philyor",
        recNormalText: " IU",
        rec: "10 REC, 173 YDS, 1 TD",

        ticketIcon: <TicketIcon />,
        ticketRate: "Tickets as low as $150",

        gamecast: "GAMECAST",
      },
    ],
  },
];

export const getAllNcaafScoreList = async (year, week, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/getNcaaScore`, {
      year: year ? year : "",
      week: week ? week : "",
    });
    if (res.status === 200) {
      const r = res.data;
      return onSuccess(r);
    } else {
      onFailure?.("Something Wrong! Please Try again later" + res.data);
    }
  } catch (error) {
    onFailure?.("Something Wrong! Please Try again later" + error);
  }
};
