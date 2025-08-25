const ftpsCal = (index) => {

    //PASSING
    const passingyards = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Passing" ? d?.yards : null
      )
    })

    const passingTD = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Passing" ? d?.passing_touchdowns : null
      )
    })

    const passingINT = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Passing" ? d?.interceptions : null
      )
    })

    //RUSHING

    const rushingYards = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Rushing" ? d?.yards : null
      )
    })

    const rushingTD = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Rushing" ? d?.rushing_touchdowns : null
      )
    })

    //RECEIVING

    const receivingYards = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Receiving" ? d?.receiving_yards : null
      )
    })

    const receivingTD = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Receiving" ? d?.receiving_touchdowns : null
      )
    })

    //Scoring

    const scoringTwoPoints = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Scoring" ? d?.two_point_conversions : null
      )
    })

    //Defense

    const fumblesRecovered = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Defense" ? d?.interceptions_returned_for_touchdowns : null
      )
    })

    //RUSHING AND RECEIVING

    const fumblesLostRushing = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {

      return (
        d.stat_category === "Rushing" ? d?.fumbles_lost : null
      )
    })

    const fumblesLostReceiving = allNflList?.response_data?.NFL[index]?.doc?.map((d) => {
      return (
        d.stat_category === "Receiving" ? d?.fumbles_lost : null
      )
    })

    //RUSHING AND RECEIVING
    var filteredfumblesLostRushing = fumblesLostRushing.filter(function (item) {
      return item !== null;
    });
    console.log(filteredfumblesLostRushing, "frdeswaq")

    var filteredfumblesLostReceiving = fumblesLostReceiving.filter(function (item) {
      return item !== null;
    });

    //Passing
    var filteredPassingYards = passingyards.filter(function (item) {
      return item !== null;
    });
    var finalPassingYards = String(filteredPassingYards).replace(',', '')

    var filteredPassingTD = passingTD.filter(function (item) {
      return item !== null;
    });
    var filteredPassingINT = passingINT.filter(function (item) {
      return item !== null;
    });

    //rushing
    var filteredRushingYards = rushingYards.filter(function (item) {
      return item !== null;
    });

    var filteredRushingTD = rushingTD.filter(function (item) {
      return item !== null;
    });

    //receiving
    var filteredReceivingYards = receivingYards.filter(function (item) {
      return item !== null;
    });

    var filteredReceivingTD = receivingTD.filter(function (item) {
      return item !== null;
    });

    //Scoring
    var filteredScoringTwoPoints = scoringTwoPoints.filter(function (item) {
      return item !== null;
    });
    //defense
    var filteredDefenceFumblesRecovered = fumblesRecovered.filter(function (item) {
      return item !== null;
    });



    //passing
    const totalPassingYards = Number(finalPassingYards) / 25;
    const totalPassingTD = Number(filteredPassingTD) * 4;
    const totalPassingINT = (Number(filteredPassingINT) * (-2));
    //rushing
    const totalRushingYards = Number(filteredRushingYards) / 10;
    const totalRushingTD = Number(filteredRushingTD) * 6;
    //RECEIVING
    const totalReceivingYards = Number(filteredReceivingYards) / 10;
    const totalReceivingTD = Number(filteredReceivingTD) * 6;
    //Scoring
    const totalScoringTwoPoints = Number(filteredScoringTwoPoints) * 2;
    //Defense
    const totalDefenceFumblesRecovered = Number(filteredDefenceFumblesRecovered) * 6;
    //RUSHING AND RECEIVING
    const totalFumblesLostRushing = (Number(filteredfumblesLostRushing.length != 0 ? filteredfumblesLostRushing[0] : 0) * (-2));
    const totalFumblesLostReceiving = (Number(filteredfumblesLostReceiving.length != 0 ? filteredfumblesLostReceiving[0] : 0) * (-2));

    const finalFumlesLost = (totalFumblesLostRushing + totalFumblesLostReceiving)

    console.log(totalPassingYards, totalPassingTD, totalPassingINT, totalRushingYards, totalRushingTD, totalReceivingYards, totalReceivingTD, totalScoringTwoPoints, totalDefenceFumblesRecovered, totalFumblesLostRushing, totalFumblesLostReceiving, "finalFumlesLost")

    const totalftps = (totalPassingYards + totalPassingTD + totalPassingINT + totalRushingYards + totalRushingTD + totalReceivingYards + totalReceivingTD + totalScoringTwoPoints + totalDefenceFumblesRecovered + totalFumblesLostRushing + totalFumblesLostReceiving);
    console.log(totalftps, "totalftps")
    return (totalftps)

  }

  let totalPassing = formattedData.Passing[0] ? ((Number(formattedData.Passing[0]?.yards.replace(',', ''))/25)+(Number(formattedData.Passing[0]?.passing_touchdowns)*4)+(Number(formattedData.Passing[0]?.interceptions)*(-2))):0;
  let totalRushing = formattedData.Rushing[0] ? ((Number(formattedData.Rushing[0]?.yards.replace(',', ''))/10)+(Number(formattedData.Rushing[0]?.passing_touchdowns)*4)+(Number(formattedData.Rushing[0]?.interceptions)*(-2))):0;
  let totalPassing = formattedData.Passing[0] ? ((Number(formattedData.Passing[0]?.yards.replace(',', ''))/25)+(Number(formattedData.Passing[0]?.passing_touchdowns)*4)+(Number(formattedData.Passing[0]?.interceptions)*(-2))):0;
  let totalPassing = formattedData.Passing[0] ? ((Number(formattedData.Passing[0]?.yards.replace(',', ''))/25)+(Number(formattedData.Passing[0]?.passing_touchdowns)*4)+(Number(formattedData.Passing[0]?.interceptions)*(-2))):0;
  let totalPassing = formattedData.Passing[0] ? ((Number(formattedData.Passing[0]?.yards.replace(',', ''))/25)+(Number(formattedData.Passing[0]?.passing_touchdowns)*4)+(Number(formattedData.Passing[0]?.interceptions)*(-2))):0;

  console.log("totalPassing",totalPassing);