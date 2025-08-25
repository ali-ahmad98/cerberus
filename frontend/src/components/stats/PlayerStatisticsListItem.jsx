const PlayerStatisticsListItem = ({ id, obj }) => {
  const { offense, defense, specialteam } = obj;
  return (
    <>
      <tbody className={`border-0  ${id % 2 !== 0 && "bg-very-light-grey"}`}>
        <tr className="border-0">
          <td className="lh-60 align-middle py-2 ps-4 ps-sm-5 border-0 blue font-16 fw-normal text-start">
            {offense}
          </td>
          <td className="lh-60 align-middle py-2 border-0 blue font-16 fw-normal text-center">
            <p className="max-w-140 text-start mx-auto"> {defense}</p>
          </td>
          <td className="lh-60 align-middle py-2 pe-5 border-0 blue font-16 fw-normal text-end">
            <p className="max-w-140 text-start ms-auto"> {specialteam}</p>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default PlayerStatisticsListItem;
