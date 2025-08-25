import tableImg1 from "../../Assets/schedule-table-img-1.png";
import tableImg2 from "../../Assets/schedule-table-img-2.png";
import tableImg3 from "../../Assets/schedule-table-img-3.png";
import tableImg4 from "../../Assets/schedule-table-img-4.png";
import tableImg5 from "../../Assets/schedule-table-img-5.png";
import tableImg6 from "../../Assets/schedule-table-img-6.png";
import tableImg7 from "../../Assets/schedule-table-img-9.png";
import tableImg8 from "../../Assets/schedule-table-img-10.png";
import tableImg9 from "../../Assets/schedule-table-img-11.png";
import tableImg10 from "../../Assets/schedule-table-img-12.png";
import tableImg11 from "../../Assets/schedule-table-img-13.png";
import tableImg12 from "../../Assets/schedule-table-img-14.png";

import tableImg13 from "../../Assets/schedule-table-charges-img.png";
import tableImg14 from "../../Assets/schedule-table-broncos-img.png";
import tableImg15 from "../../Assets/schedule-table-saints-img.png";
import tableImg16 from "../../Assets/schedule-table-bears-img.png";
import webApi from "../../WebApi/WebApi";

export const scoreBoardTableList = [
  {
    matchDate: " Friday, 30th October",
    matchDetail: [
      {
        imgUrl1: tableImg1,
        imgUrl2: tableImg2,
        time: "5:50 AM",
        place: "Bank of America Stadium",
        city: "Charlotte, NC",
        temprature: "24° C",
        ticketrate: "Tickets as low as $150",
        rushBoldText: "Todd Gurley",
        rushNormalText: "II ATL",
        rush: "122 CAR, 485 YDS, 7 TD",
        passBoldText: "Matt Ryan ",
        passNormalText: " ATL",
        pass: "190-286, 2181 YDS, 12 TD",
        recBoldText: "Robby Anderson",
        recNormalText: " CAR",
        rec: "46 REC, 640 YDS, 1 TD",
        teamFirstName: "Falcons",
        teamSecondName: "Panthers",
        team1Text: "(1-6, 1-2 Away)",
        team2Text: "(3-4, 1-2 Home)",
      },
    ],
  },
  {
    matchDate: "Sunday, 1st November",
    matchDetail: [
      {
        imgUrl1: tableImg3,
        imgUrl2: tableImg4,
        time: "11:30 PM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "11° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD",
        teamFirstName: "Patriots",
        teamSecondName: "Bills",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(5-2, 2-1 Home)",
      },
      {
        imgUrl1: tableImg5,
        imgUrl2: tableImg6,
        time: "11:30 PM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "24° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD",
        teamFirstName: "Titans",
        teamSecondName: "Bengals",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(5-2, 2-1 Home)",
      },
      {
        imgUrl1: tableImg7,
        imgUrl2: tableImg8,
        time: "11:30 PM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "11° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs  ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD ",
        teamFirstName: "Raiders",
        teamSecondName: "Browns",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(5-2, 2-1 Home)",
      },
      {
        imgUrl1: tableImg9,
        imgUrl2: tableImg10,
        time: "11:30 PM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "11° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs  ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD ",
        teamFirstName: "Colts",
        teamSecondName: "Lions",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(2-4, 0-2 Away)",
      },
      {
        imgUrl1: tableImg11,
        imgUrl2: tableImg12,
        time: "11:30 PM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "11° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs  ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD ",
        teamFirstName: "Vikings",
        teamSecondName: "Packers",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(5-2, 2-1 Home)",
      },
    ],
  },
  {
    matchDate: "Monday, 2nd November",
    matchDetail: [
      {
        imgUrl1: tableImg13,
        imgUrl2: tableImg14,
        time: "2:35 AM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "11° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs  ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD ",
        teamFirstName: "Chargers",
        teamSecondName: "Broncos",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(5-2, 2-1 Home)",
      },
      {
        imgUrl1: tableImg15,
        imgUrl2: tableImg16,
        time: "2:35 AM",
        place: "Bills Stadium",
        city: "Orchard Park, NY",
        temprature: "11° C",
        ticketrate: "Tickets as low as $43",
        rushBoldText: "Devin Singletary ",
        rushNormalText: "BUF",
        rush: "79 CAR, 299 YDS, 1 TD",
        passBoldText: "Josh Allen ",
        passNormalText: " BUF",
        pass: "175-259, 2018 YDS, 16 TD",
        recBoldText: "Stefon Diggs  ",
        recNormalText: "BUF",
        rec: "48 REC, 603 YDS, 3 TD ",
        teamFirstName: "Saints",
        teamSecondName: "Bears",
        team1Text: "(2-4, 0-2 Away)",
        team2Text: "(5-2, 2-1 Home)",
      },
    ],
  },
];

//NFL Score api integration
export const getAllNflScoreList = async (year, week, onSuccess, onFailure) => {
  try {
    const res = await webApi.post(`/getNflScore`, {
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
