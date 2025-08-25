const NflScheduleListItem = ({ id, item }) => {
  const { lightText } = item;

  return (
    <>
      <tr className={` ${id % 2 !== 0 ? "bg-very-light-grey" : ""}`}>
        <td className="lh-35 font-15 fw-normal text-start ps-0">
          <span className="d-inline-block ms-negative-12 ">
            <img
              className="table-img table-imgb"
              src={item?.homeTeam?.logo_medium}
              alt="tableImg1"
            />
          </span>
          <span className="ps-2"> {item?.homeTeam?.team_name}</span>
        </td>
        <td className="lh-35 font-16 fw-normal">
          <span className="pe-2 text-light-gray">{lightText}</span>
        </td>
        <td className="lh-35 font-15 fw-normal text-start">
          <span className="d-inline-block  ">
            <img
              className="mx-1 table-img table-imgb"
              src={item?.awayTeam?.logo_medium}
              alt="tableImg2"
            />
          </span>
          <span> {item?.awayTeam?.team_name}</span>
        </td>
        <td className="lh-35 font-15 fw-normal color-blue text-start">{item.sheduleTime}</td>

        <td className="lh-35 font-15 fw-normal text-start">{item.venue}</td>
      </tr>
    </>
  );
};

export default NflScheduleListItem;
